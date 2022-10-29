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
});