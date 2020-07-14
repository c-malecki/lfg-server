const router = require("express").Router();
const Post = require("../../models/post.model");
const PostTags = require("../../models/postTags.model");

// get all posts
router.get("/posts", (req, res) => {
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

// get all unique post tags
router.get("/posts/tags", (req, res) => {
  Post.distinct("post_tags")
    .then((tags) => res.json(tags))
    .catch((error) => res.status(400).json("Error: " + error));
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

// delete post
router.post("/posts/ids/:id/delete", (req, res) => {
  const { id } = req.params;
  Post.findOneAndDelete({ post_id: id }, (error, post) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json("Post deleted.");
  });
});

// add comment to post
router.post("/posts/ids/:id/comments", (req, res) => {
  const { id } = req.params;
  const newComment = req.body;
  Post.findOneAndUpdate(
    { post_id: id },
    { $push: { comments: newComment } },
    (error, comment) => {
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(comment);
    }
  );
});

// delete comment
router.post("/posts/ids/:id/comments/:comment/delete", (req, res) => {
  const { id, comment } = req.params;
  Post.findOneAndUpdate(
    { post_id: id },
    { $pull: { comments: { comment_id: comment } } },
    (error, comment) => {
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(`${comment} deleted`);
    }
  );
});

module.exports = router;
