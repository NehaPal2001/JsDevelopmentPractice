// //Hoisting
// getName(); //it will work but with arrow function it not work because
// console.log(x);
// var x = 1;
// function getName() {
//   console.log("Hello");
// }
// getName2(); //this is arrow function, getName here is behave like variable
// var getName2 = () => {
//   console.log("HEllO");
// };
// //function expression
// const regularFunction = function (param1, param2) {};

// // HOF which takes function as arugment and return function as result
// const name = "neha";
// function modify() {
//   name = "some";
// }

function some() {
  console.log(this);
}

const arrow = () => {
  console.log(this);
};
some();
arrow();
