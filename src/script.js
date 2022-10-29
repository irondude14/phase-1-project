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
          ${post.likes}&#128077
      </button>
      <button class='dislike' id='${post.id}'>
          ${post.dislikes}&#128078
      </button>
      <button class='delete'>Delete</button>
    </div>
    </section>
  `
  postContainer.appendChild(card)
}