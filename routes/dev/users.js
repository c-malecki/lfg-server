const router = require("express").Router();
const User = require("../../models/user.model");
const Post = require("../../models/post.model");
const Message = require("../../models/message.model");
const Group = require("../../models/group.model");

router.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.get("/users/list", (req, res) => {
  User.find({}, "-_id username user_id", (error, users) => {
    if (error) {
      res.status(500).json(`Error: $error`);
      return;
    }
    res.json(users);
  });
});

router.get("/users/:username", (req, res) => {
  const { username } = req.params;
  User.findOne({ username: username }, (error, user) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(user);
  });
});

router.get("/users/:username/posts", (req, res) => {
  const { username } = req.params;
  Post.find({ post_author: username }, (error, posts) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(posts);
  });
});

router.get("/users/:username/messages", (req, res) => {
  const { username } = req.params;
  Message.find(
    {
      $or: [
        { "original_sender.username": username },
        { "original_receiver.username": username },
      ],
    },
    (error, messages) => {
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(messages);
    }
  );
});

router.get("/users/:username/groups", (req, res) => {
  const { username } = req.params;
  Group.find({ group_members_usernames: username }, (error, groups) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(groups);
  });
});

module.exports = router;
