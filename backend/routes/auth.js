const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
router.post("/signup", [body("name", "Name should be min 3 chars long").isLength({ min: 3 }), body("email", "Enter a valid email").isEmail(), body("password", "Password should be min 5 chars long").isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exits" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.json({ error: "Please enter a unique value for email", message: err.message });
  }
});
module.exports = router;
