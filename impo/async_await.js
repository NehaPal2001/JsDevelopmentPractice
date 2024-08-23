//async function always return a promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Resolved value");
  }, 10000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Resolved value");
  }, 5000);
});

async function handlePromise() {
  console.log("Hello world");
  const val = await p1; // javascript wait here to execute line number 9 but not wait normal promise
  console.log("Namaste Javascript ");
  console.log(val);
  const val2 = await p2;
  console.log("Namaste javascript2");
  console.log(val2);
  //both val and val2 print at same time but the promise got
  //   resolved after 5 sec and p1 after 10 sec but gets printed at the same time
}
handlePromise();

//await is a keyword that is used only inside async function
function getData() {
  p.then((res) => console.log(res));
  console.log("Namaste Javascript");
}

// Real World example of async and await
// fetch returns promise
const api_url = "https://api.github.com/users/Nehapal7791";

async function handleRealWorldPromise() {
  console.log("hello");
  const user = await fetch(api_url);
  //   console.log(user);
  if (!user.ok) {
    throw new Error(`HTTP error! status: ${user.status}`);
  }
  const user_details = await user.json();
  console.log("User name: ", user_details.login);
  console.log(user_details);
}

handleRealWorldPromise();
