const router = require("express").Router();
const groups = require("../dumbydata/groups/groups.json");
const posts = require("../dumbydata/posts/posts.json");

router.get("/groups", (req, res) => {
  res.json(groups);
});

router.get("/groups/:group", (req, res) => {
  const { group } = req.params;
  const foundGroup = groups.find((g) => g.group_name === group);
  res.json(foundGroup);
});

router.get("/groups/:group/posts", (req, res) => {
  const { group } = req.params;
  const foundPosts = posts.filter((p) => p.posted_in === group);
  res.json(foundPosts);
});

router.get("/groups/:group/members", (req, res) => {
  const { group } = req.params;
  const foundGroup = groups.find((g) => g.group_name === group);
  const foundMembers = foundGroup.group_members;
  res.json(foundMembers);
});

module.exports = router;
