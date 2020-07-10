const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message_thread_id: { type: String },
  message_subject: { type: String },
  date_started: { type: String },
  original_sender: {
    username: { type: String },
    user_id: { type: String },
  },
  original_receiver: {
    username: { type: String },
    user_id: { type: String },
  },
  original_content: { type: String },
  replies: { type: Array },
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
