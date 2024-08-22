//array methods practice
console.log("hello");

//toString
let names = ["neha", "sweta", "pallavi", "mukul"];
let names2 = ["name1", "name2"];
// console.log(names.toString());
//join
// console.log(names.join(" and "));

//concat
let joined = names.concat(names2);
// console.log(joined);

//splice method is used to modifed the original array
//array.splice(start, deleteCount, item1, item2, ...);
//start is required and deleteCount and items is not required
namesCopy = [...names];
namesCopy.splice(1, 1);
console.log(namesCopy);
namesCopy.splice(1, 1, "someone");
console.log(namesCopy);

//indexOf() and LastIndexOf()

//for each
let count = 0;
names.forEach((n) => {
  count++;
});
console.log("Length of Array : ", count);
