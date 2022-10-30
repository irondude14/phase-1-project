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

document.querySelector('.add-post-form').addEventListener('submit', handleSubmit)

// Event Handlers

function handleSubmit(e) {
  e.preventDefault();
  let text = document.querySelector('#post').value;
  let postObj = {
    name: e.target.name.value,
    body: text,
    image: e.target.image.value,
    likes: 0,
    dislikes: 0
  }
  renderPosts(postObj)
  addNewPost(postObj)
}

// Server communication

function fetchPost () {
  fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(data => data.forEach(post => renderPosts(post)))
}

function addNewPost(postObj) {
  fetch('http://localhost:3000/posts',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postObj)
  })
  .then(res => res.json())
}

function updateLikes(postObj) {
  fetch(`http://localhost:3000/posts/${postObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postObj)
  })
  .then(res => res.json())
}

function deletePost(id) {
  fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    }
  })
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
    updateLikes(post)
  });
  card.querySelector('.dislike').addEventListener('click', () => {
    post.dislikes +=1;
    card.querySelector('button.dislike').textContent = `${post.dislikes} 👎`;
    updateLikes(post)
  });
  card.querySelector('.delete').addEventListener('click', () => {
    card.remove()
    deletePost(post.id)
  })
  postContainer.appendChild(card)
};

function renderGallery(post) {
  const imgGallery = document.querySelector('#photo-gallery');
  const li = document.createElement('div');
  li.innerHTML = `
    <img scr="${post.image}"/>
  `
  imgGallery.appendChild(li)
}