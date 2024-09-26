const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { Product } = require('../models/Product');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário ou senha não fornecidos' });
  }
  
  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    return res.status(400).json({ error: 'Usuário já existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ username, password: hashedPassword });

  res.json({ message: 'Usuário criado com sucesso', user: newUser });

});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Senha incorreta' });
  }

  const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

  res.redirect('/admscreen.html');

});

router.post('/edit', (req, res) => {
  res.json({ success: true }); 
 
});

module.exports = router; 
