console.log("hello world");
let age = 20;
age.toFixed();
console.log(typeof age);

interface User {
  id: string | number;
  name: string;
  age?: number; // optional property
}

interface Employee extends User {
  department: string;
}

class Manager implements Employee {
  id: number;
  name: string;
  age?: number;
  department: string;

  constructor(id: number, name: string, department: string) {
    this.id = id;
    this.name = name;
    this.department = department;
  }
}

type ID = string | number;

type User2 = {
  id: ID;
  name: string;
  age?: number; // optional property
};

type Log = (message: string) => void;
