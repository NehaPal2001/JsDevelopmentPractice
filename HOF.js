// radius = [1, 2, 3, 4];
// const area = function (radius) {
//   return Math.PI * radius * radius;
// };
// Array.prototype.calculate = function (logic) {
//   const Output = [];
//   for (let i = 0; i < this.length; i++) {
//     Output.push(logic(this[i]));
//   }
//   return Output;
// };
// console.log(radius.calculate(area));

// use of map
//map is a higher order function which is use to map all value inside array with some operations , this is a method mainly for array
//in map orginal array will remain unchanged, it will create a modified array with new memory

const users = [
  { firstname: "neha", lastname: "pal", age: 23 },
  { firstname: "elon", lastname: "musk", age: 34 },
  { firstname: "pallavi", lastname: "pal", age: 23 },
  { firstname: "john", lastname: "deo", age: 34 },
];

const fullnames = users.map((x) => x.firstname + " " + x.lastname);
const personAges = users.map((x) => x.age + 5);
console.log(personAges);
console.log(fullnames);

//filter
// let we have a task to find out first name of every person whose age is less than 30
const personAgeIsGreaterThan30 = users
  .filter(function (user) {
    if (user.age > 30) {
      return user;
    }
  })
  .map((user) => user.firstname);
console.log(personAgeIsGreaterThan30);

//reduce
//let we have task to count person of same age groups
const output = users.reduce(function (acc, curr) {
  if (acc[curr.age]) {
    acc[curr.age] = ++acc[curr.age];
  } else {
    acc[curr.age] = 1;
  }
  return acc;
}, {});
console.log(output);

//to do the wirk of map and filter using reduce
const output1 = users.reduce(function (acc, curr) {
  if (curr.age < 30) {
    acc.push(curr.firstname);
  }
  return acc;
}, []);
console.log(output1);
