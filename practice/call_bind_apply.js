function greet(greeting, puntucation) {
  console.log(greeting + "," + this.name + puntucation);
}
const person = {
  name: "Neha",
};

greet.call(person, "Hello", "!");

// call -> immediately invoke the function with specified this context and argument passed individual.
// bind -> immediately invoke the function with specified this context and argument passed as an array.

function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person2 = {
  name: "Charlie",
};

const greetCharlie = greet.bind(person2, "Hey");
greetCharlie("!");

function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person3 = {
  name: "Bob",
};

greet.apply(person3, ["Hi", "!!"]);
