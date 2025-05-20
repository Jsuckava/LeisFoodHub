function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
        return false;
    }
    return true;
}

async function handleLogin(event) {
    event.preventDefault();

    if (!validateLoginForm()) return;

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: username,
        password: password
    };

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            
            window.location.href = '/';
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
}
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
   
    if (username === "" || password === "") {
      alert("Please fill in both the username and password.");
      return false; 
    }
  
    return true;
  }
  function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false; 
    }
  
    return true; 
  }