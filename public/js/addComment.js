const addCommentHandler = async (event) => {
  event.preventDefault();
  const postId = event.currentTarget.getAttribute("data-id");
  const comment = document.querySelector("#comment").value.trim();
  const commentDate = Date();
  if (postId && comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ postId, comment, commentDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/comments/${postId}`);
    } else {
      alert("Failed to create a comment");
    }
  }
};

document
  .querySelector(".add_comment_form")
  .addEventListener("submit", addCommentHandler);
