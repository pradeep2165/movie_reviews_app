const express = require("express");
const movies = require("../models/movies");
const router = express.Router();
const Movies = require("../models/movies");

router.get("/allMovies", async (req, res) => {
  try {
    const movies = await Movies.find().limit(21);
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }
});
module.exports = router;
