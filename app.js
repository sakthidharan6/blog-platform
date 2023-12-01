document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const postForm = document.getElementById('post-form');

    const dummyPosts = [
      { title: 'First Post', content: '', author: '' },
      { title: 'Second Post', content: '', author: '' },
    ];
  
    function displayBlogPosts(posts) {
      blogPostsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <p><strong>Author:</strong> ${post.author}</p>
          <div class="comment-section">
            <h4>Comments:</h4>
            <div class="comments"></div>
            <form class="comment-form">
              <label for="comment">Add a comment:</label>
              <input type="text" id="comment" name="comment" required>
              <button type="submit">Submit</button>
            </form>
          </div>
        `;
        blogPostsContainer.appendChild(postElement);
  
        const commentForm = postElement.querySelector('.comment-form');
        const commentsContainer = postElement.querySelector('.comments');
  
        const dummyComments = [
          'Great post!',
          'I enjoyed reading this.',
        ];
  
        dummyComments.forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');
          commentElement.textContent = comment;
          commentsContainer.appendChild(commentElement);
        });
  
        commentForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const commentInput = commentForm.querySelector('#comment');
          const comment = commentInput.value;
  
          if (comment.trim() !== '') {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
            commentInput.value = ''; // Clear the comment input
          }
        });
      });
    }
    displayBlogPosts(dummyPosts);
  
    postForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(postForm);
      const newPost = {};
      formData.forEach((value, key) => {
        newPost[key] = value;
      });
  
    dummyPosts.push(newPost);
  
       displayBlogPosts(dummyPosts);
  
     postForm.reset();
    });
  });
  