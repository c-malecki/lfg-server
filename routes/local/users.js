const router = require("express").Router();
const users = require("../../dumbydata/users/users.json");
const posts = require("../../dumbydata/posts/posts.json");
const messages = require("../../dumbydata/messages/messages.json");
const groups = require("../../dumbydata/groups/groups.json");

router.get("/users", (req, res) => {
  res.json(users);
});

router.get("/users/:username", (req, res) => {
  const { username } = req.params;
  const foundUser = users.find((u) => u.username === username);
  res.json(foundUser);
});

router.get("/users/:username/posts", (req, res) => {
  const { username } = req.params;
  const foundPosts = posts.filter((p) => p.post_author === username);
  res.json(foundPosts);
});

router.get("/users/:username/messages", (req, res) => {
  const { username } = req.params;
  const foundMessages = messages.filter(
    (m) =>
      m.original_sender.username === username ||
      m.original_receiver.username === username
  );
  res.json(foundMessages);
});

router.get("/users/:username/groups", (req, res) => {
  const { username } = req.params;
  const foundGroups = groups.filter((g) =>
    g.group_members_usernames.includes(username)
  );
  res.json(foundGroups);
});

module.exports = router;
