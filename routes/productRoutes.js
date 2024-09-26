const express = require('express');
const Product = require('../models/Product');
console.log('Product model:', Product); 

const router = express.Router();

router.post('/', async (req, res) => {
  const { codigoProduto, nomeProdutoCadastrar, nomeMarcaCadastrar, nomePreçoCadastrar, dataValidade, dataFabricacao } = req.body;
  console.log("Dados enviados");

  try {
    console.log("Produto cadastrado")
    const newProduct = await Product.create({
      codigo: codigoProduto,
      nome: nomeProdutoCadastrar,
      marca: nomeMarcaCadastrar,
      preco: parseFloat(nomePreçoCadastrar), 
      validade: new Date(dataValidade),
      fabricacao: new Date(dataFabricacao)
    });

    res.redirect('/admscreen.html');
} catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar o produto' });
}

});

router.get('/listarProdutos', async (req, res) => {
  try {
      const products = await Product.findAll();
      res.json(products); 
  } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

router.put('/product/:codigo', async (req, res) => {
  const { codigo } = req.params;
  await Product.update(req.body, { where: { codigo } });
  res.json({ message: 'Produto atualizado com sucesso' });
});

router.delete('/product/:codigo', async (req, res) => {
  const { codigo } = req.params;
  await Product.destroy({ where: { codigo } });
  res.json({ message: 'Produto excluído com sucesso' });
});



module.exports = router;
