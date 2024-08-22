//promise is object representing the eventual completion or failure of asyncronouse operation
// This lets asynchronous methods return values like synchronous methods: instead of immediately returning
// the final value,the asynchronous method returns a promise to supply the value at some point in the future.

//simulating asynchronous operation with a promise
function fetchDatafromServer() {
  return new Promise((resolve, reject) => {
    console.log("Fetching data...");
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data received: { user: 'John', age: 30 }");
      } else {
        reject("Error: do not received anything");
      }
    }, 2000);
  });
}
fetchDatafromServer()
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Operation completed.");
  });

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    console.log("Post:", data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
