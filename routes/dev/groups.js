const router = require("express").Router();
const Group = require("../../models/group.model");
const Post = require("../../models/post.model");

router.get("/groups", async (req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.get("/groups/:group", (req, res) => {
  const { group } = req.params;
  Group.findOne({ group_name: group }, (error, group) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    if (group === null) {
      res.status(400).json(`It appears this group doesn't exist.`);
    }
    res.json(group);
  });
});

router.get("/groups/:group/posts", (req, res) => {
  const { group } = req.params;
  Post.find({ posted_in: group }, (error, posts) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(posts);
  });
});

router.get("/groups/:group/members", (req, res) => {
  const { group } = req.params;
  Group.findOne({ group_name: group }, "-_id group_members", (error, group) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(group);
  });
});

module.exports = router;
