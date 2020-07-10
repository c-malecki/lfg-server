const router = require("express").Router();
const users = require("../dumbydata/users/users.json");

router.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const foundUser = users.find(
    (u) => u.username === username && u.account.password === password
  );
  res.json(foundUser);
});

module.exports = router;
