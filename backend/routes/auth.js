const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
router.post("/signup", [body("name", "Name should be min 3 chars long").isLength({ min: 3 }), body("email", "Enter a valid email").isEmail(), body("password", "Password should be min 5 chars long").isLength({ min: 5 })], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.json({ error: "Please enter a unique value for email", message: err.message });
    });
});
module.exports = router;
