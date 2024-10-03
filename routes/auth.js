const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const path = require('path');
const { Product } = require('../models/Product');

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      console.log('Token não fornecido');
      return res.status(401).json({ error: 'Token não fornecido'});
  }

  jwt.verify(token, 'secreto', (err, user) => {
      if (err) {
          console.log('Token inválido ou expirado');
          return res.status(403).json({ error: 'Token inválido ou expirado'});
      }

      req.user = user;
      next();
  });
}

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

  res.json({token});

});

router.post('/createPage', authenticateToken, (req, res) => {
  res.json({ message: 'Autorizado para acessar a página de criação' });
});

router.post('/editPage', authenticateToken, (req, res) => {
  res.json({ message: 'Autorizado para acessar a página de edição' });
});

router.post('/homePage', authenticateToken, (req, res) => {
  res.json({ message: 'Autorizado para acessar a página de criação' });
});

router.post('/choosePage', authenticateToken, (req, res) => {
  res.json({ message: 'Autorizado para acessar a página de criação' });
});

router.get('/admscreen', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admscreen.html'));
});

router.get('/editscreen', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/editscreen.html'));
});

router.get('/choose.html', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/choose.html'));
});

module.exports = router; 
