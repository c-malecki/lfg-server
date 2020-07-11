const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection establised successfully");
});

const idx = require("./routes/routes-index");

app.use("/api/v1", [
  idx.devGroups,
  idx.devLogin,
  idx.devMessages,
  idx.devPosts,
  idx.devUsers,
]);

app.use("/api/test", [
  idx.localGroups,
  idx.localLogin,
  idx.localMessages,
  idx.localPosts,
  idx.localUsers,
]);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
