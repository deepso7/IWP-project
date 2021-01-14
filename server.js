const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.send("index");
});

app.get("/login", (req, res) => {
  res.send("login");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${PORT}`);
});
