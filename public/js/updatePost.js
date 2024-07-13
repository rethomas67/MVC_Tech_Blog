//update a post filtered by id and passing the id, title, and content from the form to the API
const updatePostHandler = async (event) => {
  event.preventDefault();
  const postId = event.currentTarget.getAttribute("data-id");
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  if (postId && title && content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert("Failed to update the post");
    }
  }
};

//remove the post filtered by the post id
const deletePostHandler = async (event) => {
  event.preventDefault();
  const postId = event.currentTarget.getAttribute("data-id");
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/`);
  } else {
    alert("Failed to delete the post");
  }
};

document
  .querySelector(".edit_post_form")
  .addEventListener("submit", updatePostHandler);

document
  .querySelector(".btn_delete_post")
  .addEventListener("click", deletePostHandler);
