document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-post-btn');
  const postFormContainer = document.querySelector('.add-post-form');
  addBtn.addEventListener('click', () => {
    addPost = !addPost;
    if (addPost) {
      postFormContainer.style.display = 'none';
    } else {
      postFormContainer.style.display = 'block';
    }
  });
  const submit = document.querySelector('.add-post-form');
  submit.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = document.querySelector('#post').value;
    let postObj = {
      name: e.target.name.value,
      body: text,
      image: e.target.image.value,
      likes: 0,
      dislikes: 0,
    };
    addNewPost(postObj);
  });
  fetchPost();
});

let addPost = true;

const postContainer = document.querySelector('#post-container');
const card = document.createElement('div');
let mostLikes = document.querySelector('#sortlikes');

let likes = [];
console.log('🚀 ~ file: script.js ~ line 82 ~ likes', likes);

mostLikes.addEventListener('click', () => {
  removeChildren(postContainer);
  likes.forEach((post) => {
    createPost(post);
  });
});

// Server communication

function fetchPost() {
  fetch('http://localhost:3000/posts')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((post) => {
        createPost(post);
        renderGallery(post);
      });
      data.sort((a, b) => a.likes - b.likes);
      populateLikesArray(data);
    });
}

function addNewPost(postObj) {
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj),
  })
    .then((res) => res.json())
    .then((data) => createPost(data));
}

function updateLikes(postObj) {
  fetch(`http://localhost:3000/posts/${postObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj),
  }).then((res) => res.json());
}

function deletePost(id) {
  fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    },
  });
}

// DOM Manipulation

function createPost(post) {
  const postContainer = document.querySelector('#post-container');
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
      <div>
        <h4>${post.name}</h4>
      </div>
      <section>
        <img src="${post.image}" class="post-photo" alt=""/>
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
    `;
  card.querySelector('.like').addEventListener('click', () => {
    post.likes += 1;
    card.querySelector('button.like').textContent = `${post.likes} 👍`;
    updateLikes(post);
  });
  card.querySelector('.dislike').addEventListener('click', () => {
    post.dislikes += 1;
    card.querySelector('button.dislike').textContent = `${post.dislikes} 👎`;
    updateLikes(post);
  });
  card.querySelector('.delete').addEventListener('click', () => {
    card.remove();
    deletePost(post.id);
  });
  postContainer.prepend(card);
}

function renderGallery(post) {
  const imgGallery = document.getElementById('gallery');
  const image = document.createElement('img');
  image.className = 'photo';
  image.src = post.image;
  imgGallery.prepend(image);
}

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function populateLikesArray(arr) {
  arr.forEach((i) => likes.push(i));
}
