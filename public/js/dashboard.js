//navigate to the add post form

async function createPostForm(event) {
  event.preventDefault();

  document.location.replace("/addPost");
}

const addPostElement = document
  .querySelector(".btn_new")
  .addEventListener("click", createPostForm);
