document.addEventListener('DOMContentLoaded', function(){

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera'),
            constraints:{
                facingMode: "environment"
            }
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(data){
        const code = data.codeResult.code;
        
        fetch(`/products/productByCode/${code}`)
            .then(response => response.json())
            .then(product => {
                if (product) {
                    document.getElementById('infoProdutoNome').textContent = product.nome;
                    document.getElementById('valorPreco').textContent = product.preco;
                    document.querySelector('.infoProdutoMarca').textContent = product.marca;
                    document.querySelector('.infoProdutoValidade').textContent = product.validade.split('T')[0];
                    document.querySelector('.infoProdutoFabricacao').textContent = product.fabricacao.split('T')[0];
                } else {
                    alert('Produto não encontrado.');
                }
            })
            .catch(error => console.error('Erro ao buscar produto:', error));
    });
});
