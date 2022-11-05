const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");
const { ObjectId } = require("mongodb");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

router.get("/AllComments", async (req, res) => {
  let id = "";
  if (req.header("movieId")) {
    id = req.header("movieId");
  }
  try {
    let allComments = await Comments.aggregate([
      {
        $match: {
          movie_id: new ObjectId(id),
        },
      },
    ]).sort({ date: -1 });
    res.json(allComments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error Occured");
  }
});

// addComments
router.post("/addComment", fetchuser, body("comment", "Comment should be min 3 char length").isLength({ min: 3 }), async (req, res) => {
  try {
    const { comment, movieId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const addCmt = new Comments({ name: req.user.name, email: req.user.email, movie_id: movieId, text: comment });

    const saveComment = await addCmt.save();
    res.json(saveComment);
  } catch (error) {
    console.error(error.message);
    //for log in response
    res.status(500).send("Internal Server Error");
  }
});
//delete comment
router.delete("/deleteComment/:id", fetchuser, async (req, res) => {
  console.log(req.user);
  try {
    //find the note to be delete and update it
    let comment = await Comments.findById(req.params.id);
    if (!comment) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this note
    if (comment.email.toString() !== req.user.email) {
      return res.status(404).send("Not Allowed");
    }
    comment = await Comments.findByIdAndDelete(req.params.id);
    res.json({ Success: "Comment has been deleted", comment: comment });
  } catch (error) {
    console.error(error.message);
    //for log in response
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
