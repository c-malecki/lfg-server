const router = require("express").Router();
const posts = require("../../dumbydata/posts/posts.json");

router.get("/posts", (req, res) => {
  res.json(posts);
});

router.get("/posts/ids/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = posts.find((p) => p.post_id === id);
  res.json(foundPost);
});

router.get("/posts/tags/:tag", (req, res) => {
  const { tag } = req.params;
  const foundPosts = posts.filter((p) => p.post_tags.includes(tag));
  res.json(foundPosts);
});

module.exports = router;
