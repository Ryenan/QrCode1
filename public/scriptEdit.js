window.onload = function() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/adm.html';
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const productList = document.getElementById('productList');

    let allProducts = [];

    function fetchProducts() {
        fetch('/products/listarProdutos')
            .then(response => response.json())
            .then(data => {
                console.log('Produtos recebidos:', data); 
                allProducts = data; 
                renderProductList(allProducts); 
            })
            .catch(error => console.error('Erro ao listar produtos:', error));
    }

    function renderProductList(products) {
        productList.innerHTML = '';
        if (products.length === 0) {
            console.log('Nenhum produto encontrado.'); 
        }
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.nome}`;
            li.addEventListener('click', () => loadProductToForm(product)); 
            productList.appendChild(li);
        });
    }

    function loadProductToForm(product) {
        console.log('Produto selecionado:', product); 
        document.getElementById('codigoProduto').value = product.codigo;
        document.getElementById('nomeProduto').value = product.nome;
        document.getElementById('marcaProduto').value = product.marca;
        document.getElementById('precoProduto').value = product.preco;

        if (product.validade) {
            const validadeDate = new Date(product.validade);
            const validadeFormatted = validadeDate.toISOString().split('T')[0];
            document.getElementById('validadeProduto').value = validadeFormatted;
        } else {
            document.getElementById('validadeProduto').value = '';
        }

        if (product.fabricacao) {
            const fabricacaoDate = new Date(product.fabricacao);
            const fabricacaoFormatted = fabricacaoDate.toISOString().split('T')[0];
            document.getElementById('fabricacaoProduto').value = fabricacaoFormatted;
        } else {
            document.getElementById('fabricacaoProduto').value = ''; 
        }
    }

    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.nome.toLowerCase().includes(searchTerm) || 
            product.codigo.toLowerCase().includes(searchTerm)
        );
        renderProductList(filteredProducts);
    });

    fetchProducts();
});


    document.getElementById('saveButton').addEventListener('click', function () {
        const codigo = document.getElementById('codigoProduto').value;
        const nome = document.getElementById('nomeProduto').value;
        const marca = document.getElementById('marcaProduto').value;
        const preco = document.getElementById('precoProduto').value;
        const validade = document.getElementById('validadeProduto').value;
        const fabricacao = document.getElementById('fabricacaoProduto').value;

        const data = {
            nome: nome,
            marca: marca,
            preco: preco,
            validade: validade,
            fabricacao: fabricacao
        };

        fetch(`/products/product/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                alert('Produto atualizado com sucesso');
                location.reload();
            } else {
                throw new Error('Erro ao atualizar o produto');
            }
        })
        .catch(error => console.error('Erro:', error));
    });

    document.getElementById('deleteButton').addEventListener('click', function () {
        const codigo = document.getElementById('codigoProduto').value;
    
        fetch(`/products/product/${codigo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Produto excluído com sucesso');
                location.reload();
            } else {
                throw new Error('Erro ao excluir o produto');
            }
        })
        .catch(error => console.error('Erro:', error));
    });
    

function sendPost(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Erro na requisição');
    })
    .then(data => {
        console.log(data); 
        window.location.href = '/admscreen.html'
    })
    .catch(error => console.error('Erro:', error));
}
