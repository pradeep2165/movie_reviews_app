const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({});
module.exports = mongoose.model("comment", CommentSchema);
