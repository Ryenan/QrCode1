window.onload = function() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/adm.html';
    }
};

function editPage(url, data) {

    const token = localStorage.getItem('token');

    fetch('/auth/createPage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if(response.status === 403){
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            window.location.href = 'adm.html';
        }
        else if (response.ok) {
            return response.json();
        } else {
        throw new Error('Erro na requisição');
        }
    })
    .then(data => {
        console.log(data);
        window.location.href = '/editscreen.html'; 
    })
    .catch(error => console.error('Erro:', error));
  }
  
function createPage(url, data) {

    const token = localStorage.getItem('token'); 

    fetch('/auth/editPage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if(response.status === 403){
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            window.location.href = 'adm.html';
        }
        else if (response.ok) {
            return response.json();
        } else {
        throw new Error('Erro na requisição');
        }
    })
    .then(data => {
        console.log(data);
        window.location.href = '/admscreen.html'; 
    })
    .catch(error => console.error('Erro:', error));
  }
  