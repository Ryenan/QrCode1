document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const productList = document.getElementById('productList');
    const mockData = [
        { codigo: '001', nome: 'Produto A', marca: 'Marca A', preco: 10, validade: '2024-12-31', fabricacao: '2023-12-31' },
        { codigo: '002', nome: 'Produto B', marca: 'Marca B', preco: 20, validade: '2024-11-30', fabricacao: '2023-11-30' },
    ];

    renderProductList(mockData); 

    let allProducts = [];

    // Função para buscar produtos do servidor
    function fetchProducts() {
        fetch('/products/listarProdutos')
            .then(response => response.json())
            .then(data => {
                console.log('Produtos recebidos:', data); // Verifica os dados recebidos
                allProducts = data; // Salva todos os produtos para pesquisa
                renderProductList(allProducts); // Exibe produtos na lista
            })
            .catch(error => console.error('Erro ao listar produtos:', error));
    }

    // Função para exibir a lista de produtos
    function renderProductList(products) {
        productList.innerHTML = ''; // Limpa a lista
        if (products.length === 0) {
            console.log('Nenhum produto encontrado.'); // Depuração para caso a lista esteja vazia
        }
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.nome} - ${product.codigo}`;
            li.addEventListener('click', () => loadProductToForm(product)); // Ao clicar, carrega o produto nos inputs
            productList.appendChild(li);
        });
    }

    // Função para carregar um produto nos inputs
    function loadProductToForm(product) {
        console.log('Produto selecionado:', product); // Verifica se o produto está sendo carregado corretamente
        document.getElementById('codigoProduto').value = product.codigo;
        document.getElementById('nomeProduto').value = product.nome;
        document.getElementById('marcaProduto').value = product.marca;
        document.getElementById('precoProduto').value = product.preco;
        document.getElementById('validadeProduto').value = product.validade.split('T')[0]; // Formato de data
        document.getElementById('fabricacaoProduto').value = product.fabricacao.split('T')[0]; // Formato de data
    }

    // Função para filtrar produtos na barra de pesquisa
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.nome.toLowerCase().includes(searchTerm) || 
            product.codigo.toLowerCase().includes(searchTerm)
        );
        renderProductList(filteredProducts);
    });

    fetchProducts(); // Chama ao carregar a página
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
    })
    .catch(error => console.error('Erro:', error));
}
