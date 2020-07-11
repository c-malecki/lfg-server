const router = require("express").Router();
const messages = require("../../dumbydata/messages/messages.json");

router.get("/messages", (req, res) => {
  res.json(messages);
});

router.get("/messages/:id", (req, res) => {
  const { id } = req.params;
  const foundMessage = messages.find((m) => m.message_thread_id === id);
  res.json(foundMessage);
});

module.exports = router;
