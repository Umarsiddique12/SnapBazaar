const apiBase = 'http://localhost:5000'; // Backend base URL

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    const loginError = document.getElementById('loginError');

    loginError.textContent = '';
    if (!email || !password) {
      loginError.textContent = 'Please fill all fields';
      return;
    }

    try {
      const res = await fetch(`${apiBase}/api/auth/login`, { // ✅ fixed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Login failed');

      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } catch (err) {
      loginError.textContent = err.message;
    }
  });
}

// Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const registerError = document.getElementById('registerError');

    registerError.textContent = '';
    if (!name || !email || !password) {
      registerError.textContent = 'Please fill all fields';
      return;
    }

    try {
      const res = await fetch(`${apiBase}/api/auth/register`, { // ✅ fixed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');

      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    } catch (err) {
      registerError.textContent = err.message;
    }
  });
}
