const express = require("express");
const { count } = require("../models/movies");
const router = express.Router();
const Movies = require("../models/movies");

router.get("/allMoviesSearch", async (req, res) => {
  try {
    let movies;
    let searchTitle = "";
    let searchGenres = "";
    let searchCountry = "";
    let searchCast = "";
    let SearchMovies = [];
    let page;
    let documentCount;

    if (req.header("page")) {
      page = req.header("page");
    } else {
      page = 0;
    }

    if (req.header("name")) {
      searchTitle = req.header("name");
      SearchMovies = await Movies.aggregate([
        {
          $match: {
            title: {
              $regex: new RegExp("^.*" + searchTitle + ".*", "i"),
            },
          },
        },
      ])
        .sort({ year: -1 })
        .skip(page * 20)
        .limit(20);
      documentCount = await Movies.aggregate([
        {
          $match: {
            title: {
              $regex: new RegExp("^.*" + searchTitle + ".*", "i"),
            },
          },
        },
        {
          $count: "id",
        },
      ]);
    } else if (req.header("genres")) {
      searchGenres = req.header("genres");
      SearchMovies = await Movies.aggregate([
        {
          $match: {
            genres: {
              $regex: new RegExp("^.*" + searchGenres + ".*", "i"),
            },
          },
        },
      ])
        .sort({ year: -1 })
        .skip(page * 20)
        .limit(20);
      documentCount = await Movies.aggregate([
        {
          $match: {
            genres: {
              $regex: new RegExp("^.*" + searchGenres + ".*", "i"),
            },
          },
        },
        {
          $count: "id",
        },
      ]);
    } else if (req.header("country")) {
      searchCountry = req.header("country");
      SearchMovies = await Movies.aggregate([
        {
          $match: {
            countries: {
              $regex: new RegExp("^.*" + searchCountry + ".*", "i"),
            },
          },
        },
      ])
        .sort({ year: -1 })
        .skip(page * 20)
        .limit(20);
      documentCount = await Movies.aggregate([
        {
          $match: {
            countries: {
              $regex: new RegExp("^.*" + searchCountry + ".*", "i"),
            },
          },
        },
        {
          $count: "id",
        },
      ]);
    } else if (req.header("cast")) {
      searchCast = req.header("cast");
      SearchMovies = await Movies.aggregate([
        {
          $match: {
            cast: {
              $regex: new RegExp("^.*" + searchCast + ".*", "i"),
            },
          },
        },
      ])
        .sort({ year: -1 })
        .skip(page * 20)
        .limit(20);
      documentCount = await Movies.aggregate([
        {
          $match: {
            cast: {
              $regex: new RegExp("^.*" + searchCast + ".*", "i"),
            },
          },
        },
        {
          $count: "id",
        },
      ]);
    }else if (req.header("writers")) {
      searchCast = req.header("writers");
      SearchMovies = await Movies.aggregate([
        {
          $match: {
            writers : {
              $regex: new RegExp("^.*" + searchCast + ".*", "i"),
            },
          },
        },
      ])
        .sort({ year: -1 })
        .skip(page * 20)
        .limit(20);
      documentCount = await Movies.aggregate([
        {
          $match: {
            cast: {
              $regex: new RegExp("^.*" + searchCast + ".*", "i"),
            },
          },
        },
        {
          $count: "id",
        },
      ]);
    }else {
      SearchMovies = await Movies.find()
        .sort({ year: -1 })
        .skip(page * 20)
        .limit(20);

      documentCount = await Movies.aggregate([
        {
          $match: {},
        },
        {
          $count: "id",
        },
      ]);
    }
    movies = SearchMovies;
    res.json([{ movies }, documentCount]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }
});
module.exports = router;
