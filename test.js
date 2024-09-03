// Variables-> let, const, var
// datatypes -> String,Number, Boolean ,Null(no value or empty) , Undefined(value not defined yet) , Symbol (Primitive datatype)
// Objects ->(non-primitive datatypes)
//function is called first class citizens in javascript

function doSomething(a, b, ...someVariable) {
  var sum = a + b;
  console.log(sum);
  var ans = 0;
  for (var i = 0; i < someVariable.length; i++) {
    ans += someVariable[i];
  }
  return ans;
}
console.log(doSomething(1, 2, 3, 4, 5, 6, 6));

//deStructuring
let numbers = [1, 2, 3, 4];
let [first, , , someValue] = numbers;
console.log(first);
console.log(someValue);

//destructing from object
const user = {
  Username: "nehapal",
  age: 23,
  phonenumber: 9399230933,
};
let { Username: name, age: age, phonenumber: number } = user;

console.log(name);
console.log(age);
console.log(number);

//Nested destructing from object

let person = {
  name: "neha",
  address: {
    street: "kusum vihar colony ",
    city: "Najibabad",
    state: "UP",
    zip: 246763,
  },
};
let {
  name: personName,
  address: { street, city },
} = person;
console.log(street);
console.log(city);

function callbackFunction() {
  console.log("I am  a callback function");
}

function higherOrderFunction(func) {
  console.log("I am higher order function");
  func();
}

higherOrderFunction(callbackFunction);
