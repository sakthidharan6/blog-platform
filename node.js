const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

const blogPosts = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Authentication middleware
const authenticateUser = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// API endpoints
app.get('/api/posts', (req, res) => {
  res.json(blogPosts);
});

app.post('/api/posts', authenticateUser, (req, res) => {
  const { title, content } = req.body;
  const author = req.user.username;
  const newPost = { title, content, author };
  blogPosts.push(newPost);
  res.json(newPost);
});

app.post('/api/comments', (req, res) => {
  const { postId, comment } = req.body;
  const post = blogPosts.find(p => p.id === postId);
  
  if (post) {
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);
    res.json(post.comments);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
