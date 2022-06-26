const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");

router.get("/allComments", async (req, res) => {
  try {
    const Comments = await Comments.find({ movie_id: "*" }).limit(21);
    res.json(Comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }
});
module.exports = router;
