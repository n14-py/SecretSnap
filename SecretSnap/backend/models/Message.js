const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  userLink: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);