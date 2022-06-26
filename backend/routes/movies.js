const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  obj = {
    a: "this",
    number: 32,
  };
  res.json([]);
});
module.exports = router;
