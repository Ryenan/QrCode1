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
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(function(data) {
    const code = data.codeResult.code;

    // Caso você também queira exibir o código em outro local, ajuste aqui
    document.getElementById('infoProdutoNome').textContent = code;

    // Exibe o código no elemento com id 'codigoDoProduto'
    document.getElementById('codigoDoProduto').textContent = code;

});
});
