const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  uniqueLink: { type: String, default: () => uuidv4().slice(0, 8) }
});

module.exports = mongoose.model('User', userSchema);