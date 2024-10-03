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
    res.redirect('/admscreen.html?message=Erro ao cadastrar o produto');
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

router.get('/productByCode/:codigo', async (req, res) => {
  try {
      const codigo = req.params.codigo;
      const product = await Product.findOne({ where: { codigo: codigo } });

      if (product) {
          res.json(product); 
      } else {
          res.status(404).json({ error: 'Produto não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar produto por código:', error);
      res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});


module.exports = router;
