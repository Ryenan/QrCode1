
window.onload = function() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/adm.html';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera'),
            constraints: {
                facingMode: "environment"
            }
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        const code = data.codeResult.code;

        // Verifica o elemento para exibir o código
        const codigoDoProdutoElement = document.getElementById('codigoProdutoCadastrar');
        if (codigoDoProdutoElement) {
            codigoDoProdutoElement.value = code; // Atualiza o valor do input
        } else {
            console.error('Elemento com ID "codigoProdutoCadastrar" não encontrado.');
        }
    });

    if (!localStorage.getItem('token')) {
        window.location.href = '/adm.html';
    }
});


function createPage(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro na requisição');
    })
    .then(data => {
        console.log(data);
        window.location.href = '/admscreen.html'; 
    })
    .catch(error => console.error('Erro:', error));
}


