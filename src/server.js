const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const originOptions = process.env.NODE_ENV === "production" ? "https://lfg-site.netlify.app/" : "http://localhost:3000";
app.use(
  cors({
    origin: originOptions,
  })
);
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

app.use("/api/v1", [idx.groups, idx.login, idx.messages, idx.posts, idx.users]);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
