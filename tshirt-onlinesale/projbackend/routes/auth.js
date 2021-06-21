var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

/*
//TODO: router to controller used in json formate
router.get('/about', function (req, res) {
  res.send('About birds')
}) */

router.post("/signup", [
  check("name").isLength({ min: 3 }).withMessage("Name must be at least 3 char"),
  check("email").isEmail().withMessage("Email is required"),
  check("password").isLength({ min: 3 }).withMessage('Password must be at least 3 char'),
], signup);

router.post("/signin", [
  check("email").isEmail().withMessage("Email is required"),
  check("password").isLength({ min: 3 }).withMessage('Password is required'),
], signin);

router.get("/signout", signout);

/* router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
}); */

module.exports = router;