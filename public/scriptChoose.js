window.onload = function() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/adm.html';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('token')) {
        window.location.href = '/adm.html';
    }
});

function editPage(url, data) {

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Token não encontrado. Você precisa fazer login.');
            setTimeout(() => {
                window.location.href = 'adm.html';
            }, 1000);             
        return; 
    }
    
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
            localStorage.removeItem('token');
            alert('Sua sessão expirou. Por favor, faça login novamente.');
                setTimeout(() => {
                    window.location.href = 'adm.html';
                }, 1000);                
            return;
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
    if (!token) {
        alert('Token não encontrado. Você precisa fazer login.');
            setTimeout(() => {
                window.location.href = 'adm.html';
            }, 1000);     
        return;
    }
    
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
            localStorage.removeItem('token');
            alert('Sua sessão expirou. Por favor, faça login novamente.');
                setTimeout(() => {
                    window.location.href = 'adm.html';
                }, 1000);           
            return;
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
  
function choosePage(url, data) {

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Token não encontrado. Você precisa fazer login.');
            setTimeout(() => {
                window.location.href = 'adm.html';
            }, 1000);          
        return; 
    }

    fetch('/auth/choosePage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    .then(response => {

        console.log(response);

        if(response.status === 403){
            localStorage.removeItem('token');
            alert('Sua sessão expirou. Por favor, faça login novamente.');
                setTimeout(() => {
                    window.location.href = 'adm.html';
                }, 1000);                 
            return;
        }
        
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        return response.json();
    })
    .then(data => {
        console.log(data);
        window.location.href = '/choose.html'; 
    })
    .catch(error => console.error('Erro:', error));
  }
  
  function homePage(url, data) {
  
      const token = localStorage.getItem('token');
      if (!token) {
          alert('Token não encontrado. Você precisa fazer login.');
              setTimeout(() => {
                  window.location.href = 'adm.html';
              }, 1000);          
          return; 
      }
  
      fetch('/auth/homePage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
      })
      .then(response => {
  
          console.log(response);
  
          if(response.status === 403){
              localStorage.removeItem('token');
              alert('Sua sessão expirou. Por favor, faça login novamente.');
                  setTimeout(() => {
                      window.location.href = 'adm.html';
                  }, 1000);                 
              return;
          }
          
          if (!response.ok) {
              throw new Error('Erro na requisição: ' + response.statusText);
          }
  
          return response.json();
      })
      .then(data => {
          console.log(data);
          window.location.href = '/home.html'; 
      })
      .catch(error => console.error('Erro:', error));
    }