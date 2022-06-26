const connectToMongo = require("./config");
connectToMongo();
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
//available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
// app.use("/api/comments", require("./routes/comments"));
// app.use("/api/comments", require("./routes/comments"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
