const router = require("express").Router();
const Post = require("../../models/post.model");

router.get("/posts", async (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.get("/posts/ids/:id", (req, res) => {
  const { id } = req.params;
  Post.findOne({ post_id: id }, (error, post) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(post);
  });
});

router.get("/posts/tags/:tag", (req, res) => {
  const { tag } = req.params;
  Post.find({ post_tags: tag }, (error, posts) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(posts);
  });
});

module.exports = router;
