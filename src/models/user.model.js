const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  friends_username_list: [{ type: String }],
  accepted: [{ type: Object }],
  pending: [{ type: Object }],
});

const userScehma = new Schema({
  user_id: { type: String },
  username: { type: String },
  account: {
    date_joined: { type: String },
    password: { type: String },
    email: { type: String },
  },
  profile: {
    user_img: { type: String },
    banner_img: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    bio: { type: String },
  },
  friends: friendsSchema,
  groups: {
    group_name_list: { type: Array },
    joined: { type: Array },
    pending: { type: Array },
  },
});

const User = mongoose.model("users", userScehma);

module.exports = User;
