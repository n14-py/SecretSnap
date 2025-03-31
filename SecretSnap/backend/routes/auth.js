const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send('Usuario creado');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send('Credenciales inválidas');
    }
    
    const token = jwt.sign(
      { userId: user._id, link: user.uniqueLink },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token, link: user.uniqueLink });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;