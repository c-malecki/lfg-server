const router = require("express").Router();
const Post = require("../../models/post.model");
const PostTags = require("../../models/postTags.model");

// get all posts
router.get("/posts", async (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((error) => res.status(400).json("Error: " + error));
});
// get post by post_id
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

// get all posts that have the tag
router.get("/posts/bytags/:tag", (req, res) => {
  const { tag } = req.params;
  Post.find({ post_tags: tag }, (error, posts) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(posts);
  });
});

// new post
router.post("/posts", async (req, res) => {
  const newPost = req.body;
  const doc = await new Post(newPost);
  doc
    .save()
    .then((post) => res.json(post))
    .catch((error) => res.status(500).json(`Error: ${error}`));
});

// get all unique post tags
router.get("/posts/tags", (req, res) => {
  Post.distinct("post_tags")
    .then((tags) => res.json(tags))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new tag
// router.post("/posts/tags", async (req, res) => {
//   const newPostTags = req.body.post_tags;
//   await PostTags.findByIdAndUpdate(
//     { _id: "5f0cd42b025a590a8cb1dca0" },
//     { $addToSet: { post_tags: { $each: newPostTags } } }
//   )
//     .then((tags) => res.json(tags))
//     .catch((error) => res.status(400).json("Error: " + error));
// });

module.exports = router;
