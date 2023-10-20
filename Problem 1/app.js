document.addEventListener("DOMContentLoaded", function () {
  const tweetForm = document.getElementById("tweetForm");
  const tweetText = document.getElementById("tweetText");
  const responseDiv = document.getElementById("response");

  tweetForm.addEventListener("submit", function (event) {
    // to prevent the default behavior of an HTML element when an event is triggered. It's commonly used in event handlers, such as those for form submissions(Avoid full reload) or links, to control how the browser responds to an event.
    event.preventDefault(); 

    const tweet = tweetText.value;
    postTweet(tweet, responseDiv); 
  });
});

function postTweet(tweetContent, responseDiv) {
  // Make an HTTP POST request to the backend
  fetch("https://one00x-data-analysis.onrender.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: { content: tweetContent } }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        throw new Error("Tweet posting failed");// Handle failure
      }
    })
    .then((data) => {
      // Handle successful tweet post
      handleSuccessfulPost(data, responseDiv); // Handle successful tweet post
    })
    .catch((error) => {
      // Handle error
      handlePostError(error, responseDiv); // Handle error
    });
}

function handleSuccessfulPost(data, responseDiv) {
  responseDiv.innerText = `Tweet posted successfully! Post ID: ${data.id}`;
}

function handlePostError(error, responseDiv) {
  responseDiv.innerText = `Error: ${error.message}`;
}


