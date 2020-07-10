const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post_id: { type: String },
  post_author: { type: String },
  date_posted: { type: String },
  post_title: { type: String },
  post_tags: { type: Array },
  posted_in: { type: String },
  post_content: { type: String },
  comments: { type: Array },
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
