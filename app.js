const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); 
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', productRoutes); 
app.use('/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL!'))
  .catch((error) => console.log('Erro ao conectar ao MySQL:', error));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

