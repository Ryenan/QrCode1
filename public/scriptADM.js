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

        document.getElementById('codigoDoProduto').textContent = code;
        document.getElementById('codigoProduto').value = code;
    });

});
