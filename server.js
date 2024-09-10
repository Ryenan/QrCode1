const express = require('express');
const path = require('path');

const app = express();
const port = 3702;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/administracao', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adm.html'));
});

app.listen(3702, () => {
    console.log(`Servidor rodando em http://localhost:${3702}`);
});