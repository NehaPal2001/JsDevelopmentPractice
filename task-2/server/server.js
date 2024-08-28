import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

const posts = [
  { id: 1, title: "Post 1", content: "This is the content of Post 1" },
  { id: 2, title: "Post 2", content: "This is the content of Post 2" },
  { id: 3, title: "Post 3", content: "This is the content of Post 3" },
];

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
