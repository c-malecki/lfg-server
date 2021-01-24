const router = require("express").Router();
const User = require("../../models/user.model");

router.get("/login", async (req, res) => {
  User.findOne(
    {
      username: req.query.username,
      "account.password": req.query.password,
    },
    (error, user) => {
      if (user === null) {
        res.status(401).json(`User or password is incorrect.`);
        return;
      }
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(user);
    }
  );
});

module.exports = router;
