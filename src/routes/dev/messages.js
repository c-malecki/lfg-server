const router = require("express").Router();
const Message = require("../../models/message.model");

// get all messages
router.get("/messages", (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((error) => res.status(400).json("Error: " + error));
});
// get message by message_id
router.get("/messages/:id", (req, res) => {
  const { id } = req.params;
  Message.findOne({ message_thread_id: id }, (error, message) => {
    if (message === null) {
      res.status(404).json(`This message doesn't appear to exist.`);
      return;
    }
    if (error) {
      res.status(500).json(`Error: ${error}`);
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

// message reply
router.post("/messages/:id/replies", (req, res) => {
  const { id } = req.params;
  const newReply = req.body;
  Message.findOneAndUpdate(
    { message_thread_id: id },
    { $push: { replies: newReply } },
    (error, reply) => {
      if (error) {
        res.status(500).json(`Error: ${error}`);
        return;
      }
      res.json(reply);
    }
  );
});

module.exports = router;
