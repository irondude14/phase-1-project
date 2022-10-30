let addPost = true


// Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-post-btn");
  const postFormContainer = document.querySelector(".add-post-form");
  addBtn.addEventListener("click", () => {
    addPost = !addPost;
    if (addPost) {
        postFormContainer.style.display = "block";
    } else {
        postFormContainer.style.display = "none";
    }
  });
  fetchPost()
});

// Server communication

function fetchPost () {
  fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(data => data.forEach(post => renderPosts(post)))
    // console.log(data)
}


// DOM Manipulation

function renderPosts(post) {
  const postContainer = document.querySelector('#post-container');
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div>
      <h4>${post.name}</h4>
    </div>
    <section>
      <img src="${post.image}" class="post-photo"/>
      <p>${post.body}</p>
    <div>
      <button class='like' id='${post.id}'>
          ${post.likes} 👍
      </button>
      <button class='dislike' id='${post.id}'>
          ${post.dislikes} 👎
      </button>
      <button class='delete'>Delete</button>
    </div>
    </section>
  `
  card.querySelector('.like').addEventListener('click', () => {
    post.likes +=1;
    card.querySelector('button.like').textContent = `${post.likes} 👍`
  });
  card.querySelector('.dislike').addEventListener('click', () => {
    post.dislikes +=1;
    card.querySelector('button.dislike').textContent = `${post.dislikes} 👎`;
  });
  card.querySelector('.delete').addEventListener('click', () => {
    card.remove()
  })
  postContainer.appendChild(card)
};