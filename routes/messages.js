const router = require('express').Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/:link', async (req, res) => {
  try {
    const message = new Message({
      content: req.body.content,
      userLink: req.params.link
    });
    await message.save();
    res.send('Mensaje enviado');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/my-messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({ userLink: req.user.link });
    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;