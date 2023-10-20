document.addEventListener("DOMContentLoaded", function () {
  const tweetForm = document.getElementById("tweetForm");
  const tweetText = document.getElementById("tweetText");
  const responseDiv = document.getElementById("response");

  tweetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const tweet = tweetText.value;

    // Make an HTTP POST request to the backend
    fetch("https://one00x-data-analysis.onrender.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: { content: tweet } }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse response as JSON
        } else {
          throw new Error("Tweet posting failed"); // Handle failure
        }
      })
      .then((data) => {
        // Handle successful tweet post
        responseDiv.innerText = `Tweet posted successfully! Tweet ID: ${data.id}`;
      })
      .catch((error) => {
        // Handle error
        responseDiv.innerText = `Error: ${error.message}`;
      });
  });
});
