const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  group_id: { type: String },
  group_name: { type: String },
  group_profile: {
    group_img: { type: String },
    group_banner: { type: String },
    date_created: { type: String },
    description: { type: String },
  },
  group_members_usernames: { type: Array },
  group_members: { type: Array },
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
