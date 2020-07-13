const router = require("express").Router();
const Message = require("../../models/message.model");

// get all messages
router.get("/messages", async (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((error) => res.status(400).json("Error: " + error));
});
// get message by message_id
router.get("/messages/:id", async (req, res) => {
  const { id } = req.params;
  Message.findOne({ message_thread_id: id }, (error, message) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    if (message === null) {
      res.status(400).json(`Uh oh. This message doesn't appear to exist.`);
      return;
    }
    res.json(message);
  });
});

// new message
router.post("/messages", async (req, res) => {
  const newMessage = req.body;
  const doc = await new Message(newMessage);
  doc
    .save()
    .then((message) => res.json(message))
    .catch((error) => res.status(500).json(`Error: ${error}`));
});

module.exports = router;
