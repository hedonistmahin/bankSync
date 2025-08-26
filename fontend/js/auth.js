// API base URL configuration for Vercel deployment
const API_BASE = window.location.hostname === 'localhost' ? '' : '/api';
document.addEventListener('DOMContentLoaded', function() {
  // Sign In Form
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      try {
        const response = await fetch('${API_BASE}/api/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'dashboard.html';
      } catch (err) {
        alert('Sign-in failed');
        console.error(err);
      }
    });
  }

  // Sign Up Form
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      try {
        const response = await fetch('${API_BASE}/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password })
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          return;
        }
        alert('Sign-up successful! Please sign in.');
        window.location.href = 'index.html';
      } catch (err) {
        alert('Sign-up failed');
        console.error(err);
      }
    });
  }

  // Password strength (keep your existing logic if any)
  const passwordInput = document.getElementById('signupPassword');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthBar = document.querySelector('.strength-fill');
      const strengthText = document.querySelector('.strength-text');
      const value = passwordInput.value;
      let strength = 0;
      if (value.length > 0) strength += 20;
      if (value.length > 8) strength += 20;
      if (/[A-Z]/.test(value)) strength += 20;
      if (/[0-9]/.test(value)) strength += 20;
      if (/[^A-Za-z0-9]/.test(value)) strength += 20;
      strengthBar.style.width = `${strength}%`;
      strengthBar.style.background = strength < 40 ? '#f87171' : strength < 80 ? '#f59e0b' : '#10b981';
      strengthText.textContent = strength < 40 ? 'Weak' : strength < 80 ? 'Moderate' : 'Strong';
    });
  }
});