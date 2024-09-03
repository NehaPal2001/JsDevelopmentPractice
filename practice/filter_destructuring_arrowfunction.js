const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 100000,
    onSale: true,
  },
  {
    id: 2,
    name: "smart phone",
    category: "Electronics",
    price: 25000,
    onSale: false,
  },
  { id: 3, name: "T-shirt", category: "Clothing", price: 1000, onSale: true },
];

const electronicsOnSale = products.filter(
  ({ category, onSale }) => category === "Electronics" && onSale
);

const discount = products.filter;

electronicsOnSale.forEach(({ name, price }) => {
  console.log(`Product: ${name} and Price:${price}`);
});

const smartphones = products.find(
  (products) => products.name === "smart phone"
);

console.log(smartphones);

const arrStr = ["neha", "some", "one", "one"];

const firstProduct = arrStr.findIndex((arrStr) => arrStr === "one");
console.log(firstProduct);
