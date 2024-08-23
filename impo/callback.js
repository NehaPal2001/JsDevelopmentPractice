const carts = ["shoes", "makeup", "pants", "shirts"];
//1.create order
//2.Payments
//This is callback hell
// where multiple nested callbacks are used, leading to code that is difficult to read, maintain, and debug.
// This often happens when performing a series of asynchronous operations that depend on each other.
api.createOrder(function () {
  api.makePayment(function () {
    api.showOrderSummary(function () {
      api.showWalletDetails();
    });
  });
});

//Inversion of control when you loose the control of your call due to lots of callback
//Callbacks vs promises

//this is callback
createOrder(carts, function (orderId) {
  proceedPayment(orderId);
});

//this is promise
const promise = createOrder(carts);
promise.then(function (orderId) {
  proceedPayment(orderId);
});
