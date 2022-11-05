const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = "pradeepkumarswain";
const fetchuser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");
router.post("/signup", [body("name", "Name should be min 3 chars long").isLength({ min: 3 }), body("email", "Enter a valid email").isEmail(), body("password", "Password should be min 5 chars long").isLength({ min: 5 })], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exits" });
    }
    //secure password by bcrypt
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const authtoken = jwt.sign(data, jwt_secret);
    success = true;
    res.json({ success, authtoken });
  } catch (err) {
    console.error(err.message);
    res.json({ success, error: "Please enter a unique value for email", message: err.message });
  }
});

router.post("/login", [body("email", "Enter a valid email").isEmail(), body("password", "Password should not be blank").exists()], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success, error: "Please login with correct credential" });
    }
    // verifying password
    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please login with correct credential" });
    }

    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    console.log(data);
    const authtoken = jwt.sign(data, jwt_secret);
    success = true;
    res.json({ success, authtoken });
  } catch (err) {
    console.error(err.message);
    res.json({ success, error: "Please enter a unique value for email", message: err.message });
  }
});

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }
});
module.exports = router;
