const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("MongoDB database connection establised successfully");
// });

const userRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const groupsRouter = require("./routes/groups");
const messagesRouter = require("./routes/messages");
const loginRouter = require("./routes/login");
app.use("/api/v1", userRouter);
app.use("/api/v1", postsRouter);
app.use("/api/v1", groupsRouter);
app.use("/api/v1", messagesRouter);
app.use("/api/v1", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
