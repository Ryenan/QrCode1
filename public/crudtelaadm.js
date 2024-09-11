function login(){

const correctUser = "admrodolfo"
const correctSenha = "123"

const senha = document.getElementById("pass").value;
const user = document.getElementById("user").value;


    if((user === correctUser && senha === correctSenha)){
        localStorage.setItem("loggedIn", "true");

        window.location.href = "http://localhost:3702/adm/tela.html"

    } else {
        alert("Dados incorretos")
    }
}

function checkLogin(){
    const isLoggedIn = localStorage.getItem("loggedIn");

    if(isLoggedIn !== true){
        alert("Você precisa fazer o login primeiro!");

        window.location.href = "http://localhost:3702/adm.html";

    }
}

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

Quagga.onDetected(function(data){
    const code = data.codeResult.code;

    document.getElementById('codigoDoProduto').textContent = code;
});