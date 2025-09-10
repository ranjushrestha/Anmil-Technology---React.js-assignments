import { getData } from './useFetch.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('data-container');

  try {
    const posts = await getData();

    const filteredPosts = posts.filter(post => post.title.length > 20);


    const postElements = filteredPosts.map(post => {
      return `
        <div class="post-card">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <hr />
        </div>
      `;
    });

    
    container.innerHTML = postElements.join('');

  } catch (error) {
    container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});
