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

// edit bio
router.post("/users/:username/profile/bio", (req, res) => {
  const { username } = req.params;
  const newBio = req.body.bio;
  User.findOneAndUpdate(
    { username: username },
    {
      "profile.bio": newBio,
    },
    (error, bio) => {
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(bio);
    }
  );
});

// get user friends
router.get("/users/:username/friends", (req, res) => {
  const { username } = req.params;
  User.findOne({ username: username }, "-_id friends", (error, friends) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(friends);
  });
});

// send friend request
router.post("/users/:username/friends/pending/:requested", (req, res) => {
  const { username, requested } = req.params;
  const request = req.body;
  User.updateMany(
    {
      $or: [{ username: username }, { username: requested }],
    },
    { $addToSet: { "friends.pending": request } },
    (error, request) => {
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(request);
    }
  );
});

router.post(
  "/users/:username/friends/pending/cancel/:requested",
  (req, res) => {
    const { username, requested } = req.params;
    const request = req.body;
    User.updateMany(
      {
        $or: [{ username: username }, { username: requested }],
      },
      { $pull: { "friends.pending": request } },
      (error, request) => {
        if (error) {
          res.status(500).json(`Error: ${error}`);
          return;
        }
        res.json(request);
      }
    );
  }
);

// accept friend request
router.post(
  "/users/:username/friends/pending/accept/:requested",
  (req, res) => {
    const { username, requested } = req.params;
    const request = req.body;
    User.updateMany(
      {
        $or: [{ username: username }, { username: requested }],
      },
      { $addToSet: { "friends.accepted": request } },
      (error, request) => {
        if (error) {
          res.status(500).json(`Error: ${error}`);
          return;
        }
        res.json(request);
      }
    );
  }
);

// remove friend
router.post(
  "/users/:username/friends/accepted/remove/:removeuser",
  (req, res) => {
    const { username, removeuser } = req.params;
    const request = req.body;
    User.updateMany(
      {
        $or: [{ username: username }, { username: removeuser }],
      },
      { $pull: { "friends.accepted": request } },
      (error, request) => {
        if (error) {
          res.status(500).json(`Error: ${error}`);
          return;
        }
        res.json(request);
      }
    );
  }
);

module.exports = router;
