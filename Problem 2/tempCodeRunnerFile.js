function getData() {
  let assignmentId;
  fetch(
    "https://one00x-data-analysis.onrender.com/assignment?url=ajinkyabodke678@gmail.com",
    {
      method: "GET",
    }
  )
    .then((response) => {
      if (response.ok) {
        assignmentId = response.headers.get("x-assignment-id");
        return response.json(); // Parse response as JSON
      } else {
        throw new Error("Error fetching data"); // Handle failure
      }
    })
    .then((data) => {
      // Handle successful response
      findWordCount(data, assignmentId); // finding most used word
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function findWordCount(jargons, assignmentId) {
  let wordCount = {}; //object to store word count

  wordCount = jargons.reduce((acc, word) => {
    if (acc[word]) {
      acc[word]++; //increasing count with each encounter
    } else {
      acc[word] = 1; //first encounter of the word
    }
    return acc;
  }, {});

  findMostUsedWord(wordCount, assignmentId);
}

function findMostUsedWord(wordCount, assignmentId) {
  const wordFrequencyArray = Object.entries(wordCount); //[[[0] = word , [1] = count]]

  const maxFrequencyWord = wordFrequencyArray.reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  }, wordFrequencyArray[0]);

  sendData(maxFrequencyWord[0], assignmentId);
}

function sendData(maxFrequencyWord, assignmentId) {
  const result = {
    assignment_id: assignmentId,
    answer: maxFrequencyWord,
  };
  fetch(
    "https://one00x-data-analysis.onrender.com/assignment?url=ajinkyabodke678@gmail.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        throw new Error("Posting result failed"); // Handle failure
      }
    })
    .then((data) => {
      // Handle successful response
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
}

getData();
