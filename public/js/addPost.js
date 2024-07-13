//add a post with the forms parameters on title, content, and the current date

const addPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const postDate = Date();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content, postDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create project");
    }
  }
};

document
  .querySelector(".add_post_form")
  .addEventListener("submit", addPostFormHandler);
