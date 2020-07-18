const User = require("../models/user.model");
const Post = require("../models/post.model");
const Message = require("../models/message.model");
const Group = require("../models/group.model");
const messagesData = require("./messages.json");
const groupsData = require("./groups.json");
const postsData = require("./posts.json");
const usersData = require("./users.json");

const resetDatabase = async () => {
  const removeAll = async () => {
    // remove docs
    await Message.deleteMany({}, (error, messages) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully deleted messages");
      }
    });
    await Post.deleteMany({}, (error, posts) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully deleted posts");
      }
    });
    await User.deleteMany({}, (error, users) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully deleted users");
      }
    });
    await Group.deleteMany({}, (error, groups) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully deleted groups");
      }
    });
  };
  const addAll = async () => {
    // reinsert docs
    await Message.insertMany(messagesData, (error, messages) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully readded messages");
      }
    });
    await Post.insertMany(postsData, (error, posts) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully readded posts");
      }
    });
    await User.insertMany(usersData, (error, users) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully readded users");
      }
    });
    await Group.insertMany(groupsData, (error, groups) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully readded groups");
      }
    });
  };
  try {
    await removeAll();
    await addAll();
  } catch (error) {
    console.log(error);
  }
};

module.exports = resetDatabase;
