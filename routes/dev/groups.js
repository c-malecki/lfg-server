const router = require("express").Router();
const Group = require("../../models/group.model");
const Post = require("../../models/post.model");

router.get("/groups", (req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.get("/groups/:group", (req, res) => {
  const { group } = req.params;
  Group.findOne({ group_name: group }, (error, foundGroup) => {
    if (foundGroup === null) {
      res.status(404).json(`${group} doesn't exist.`);
      return;
    }
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(foundGroup);
  });
});

router.get("/groups/:group/posts", (req, res) => {
  const { group } = req.params;
  Post.find({ posted_in: group }, (error, foundGroup) => {
    if (foundGroup === null) {
      res.status(404).json(`${group} doesn't exist.`);
      return;
    }
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(foundGroup);
  });
});

router.get("/groups/:group/members", (req, res) => {
  const { group } = req.params;
  Group.findOne(
    { group_name: group },
    "-_id group_members",
    (error, foundGroup) => {
      if (foundGroup === null) {
        res.status(404).json(`${group} doesn't exist.`);
        return;
      }
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(foundGroup);
    }
  );
});

module.exports = router;
