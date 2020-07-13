const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postTagsSchema = new Schema({
  post_tags: [{ type: String }],
});

const PostTags = mongoose.model("posttags", postTagsSchema);

module.exports = PostTags;
