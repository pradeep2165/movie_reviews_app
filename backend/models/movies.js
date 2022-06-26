const mongoose = require("mongoose");
const { Schema } = mongoose;

const MoviesSchema = new Schema({});
module.exports = mongoose.model("movie", MoviesSchema);
