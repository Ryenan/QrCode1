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