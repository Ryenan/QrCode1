const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const username = document.getElementById('user').value;
  const password = document.getElementById('pass').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    window.location.href = 'choose.html';
  } else {
    const errorData = await response.json();
    alert(errorData.error);
  }
});
