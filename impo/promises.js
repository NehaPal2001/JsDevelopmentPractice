const gihub_api = "https://api.github.com/users/Nehapal7791";

const user = fetch(gihub_api);
console.log(user);

//handling promise
const github_api = "https://api.github.com/users/Nehapal7791";

fetch(github_api)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//promise chaining
//need care of return statement
const cart = ["pants", "shoes", "something"];
createNewOrder(cart)
  .then(function (orderId) {
    return orderId;
  })
  .then(function (orderId) {
    return proceed(orderId);
  })
  .then(function (paymentInfo) {
    return showOrderSummary(paymentInfo);
  })
  .catch(function (err) {
    console.log(err);
  });

//Create Promises
const promise = createNewOrder(cart);

promise.then(function () {
  proceed(orderId);
});

function createNewOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart) {
      reject("Rejected");
    }
    const orderId = 1234;
    if (orderId) {
      resolve(orderId);
    }
  });
  return pr;
}
function validateCart(cart) {
  return true;
}
