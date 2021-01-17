require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const axios = require("axios");

const passport = require("./middleware/passport");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", async (req, res) => {
  try {
    const weather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=Bhopal,in&APPID=${process.env.WEATHER_KEY}`
    );

    res.render("index", { name: weather.name });
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/weather", async (req, res) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q={Bhopal}&appid=${process.env.WEATHER_KEY}`
    );

    console.log(res);
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

app.get("/news", async (req, res) => {
  try {
    const res = await axios.get(
      `http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${NEWS_KEY}`
    );
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${PORT}`);
});
