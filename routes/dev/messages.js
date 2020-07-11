const router = require("express").Router();
const Message = require("../../models/message.model");

router.get("/messages", async (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.get("/messages/:id", async (req, res) => {
  const { id } = req.params;
  Message.findOne({ message_thread_id: id }, (error, message) => {
    if (error) {
      res.status(500).json(`Error: ${error}`);
      return;
    }
    res.json(message);
  });
});

router.post("/messages", async (req, res) => {
  const newMessage = req.body;
  const doc = await new Message(newMessage)
    .save()
    .then(() =>
      res.json({ doc }).catch((error) => res.status(500).json({ error }))
    );
});

module.exports = router;
