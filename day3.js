//arrow function behave like a variable
//Arrow Functions (or any function expressions) are not
//hoisted in the same way as function declarations.
//Instead, the variable to which the arrow function is assigned
//is hoisted, but the function itself is not initialized until
//the code is executed.
arrowFunctionSyntax(); // Refernce error in execution context it show undefined because it behaving like avariable
const arrowFunctionSyntax = () => {
  console.log("I am arrow function");
};

//synatax of arrow function
function simpleFunction() {
  console.log("simpleFunction");
}

//arrow function

const person = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}`);
  },
};

person.greet(); // Output: "Hello, Alice"

const person1 = {
  name: "Alice",
  greet: () => {
    console.log(`Hello, ${this.name}`);
  },
};

person1.greet(); // Output: "Hello, undefined"
//undefined is due yo this keyword block in normal function every this is
// created but in arrow function this keyword take the reference
