const employees = [
  { id: 1, name: "Alice", role: "Developer", experience: 5, salary: 75000 },
  { id: 2, name: "Bob", role: "Designer", experience: 3, salary: 60000 },
  { id: 3, name: "Charlie", role: "Manager", experience: 8, salary: 95000 },
  { id: 4, name: "David", role: "Developer", experience: 4, salary: 72000 },
  { id: 5, name: "Eve", role: "Developer", experience: 2, salary: 68000 },
  { id: 6, name: "Frank", role: "Designer", experience: 5, salary: 62000 },
  { id: 7, name: "Grace", role: "Manager", experience: 7, salary: 90000 },
];

const salaryFilter = employees.filter(
  (employee) => employee.salary >= 60000 && employee.salary <= 70000
);
console.log(salaryFilter);

const nameAndRole = employees.map(({ name, role }) => ({ name, role }));
console.log(nameAndRole);

const totalSalary = employees.reduce(
  (acc, employee) => acc + employee.salary,
  0
);
console.log(totalSalary);

const experiencedEmployees = employees.filter(
  (employee) => employee.experience > 10
);
if (experiencedEmployees.length == 0) {
  console.log("unapproved");
} else {
  console.log("approved");
}
// console.log(experiencedEmployees);
