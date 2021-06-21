const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req, res) => {
  return res.send("Home Page");
});

//Middleware
const admin = (req, res) => {
  return res.send("this is admin Dashboard");
}

const isAdmin = (req, res, next) => {
  console.log("isAdmin is Running");
  next();
}

const isloggedIn = (req, res, isloggedIn) => {
  console.log("Admin loggedIn");
}

app.get("/admin", isloggedIn, isAdmin, admin);




app.get("/login", (req, res) => {
  return res.send("You are visiting login route");
});

app.get("/signup", (req, res) => {
  return res.send("You are visiting Signup");
});
app.listen(port, () => {
  console.log("Server is up and running...");
})