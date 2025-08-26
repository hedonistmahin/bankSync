// API base URL configuration for Vercel deployment
const API_BASE = window.location.hostname === 'localhost' ? '' : '/api';
document.addEventListener('DOMContentLoaded', function() {
  // Load user data in topbar
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const userNameSpans = document.querySelectorAll('.user-name');
    const userEmailSpans = document.querySelectorAll('.user-email');
    userNameSpans.forEach(span => span.textContent = `${user.firstName} ${user.lastName}`);
    userEmailSpans.forEach(span => span.textContent = user.email);
  } else if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('sign-up.html')) {
    window.location.href = 'index.html';
  }

  // Sidebar toggle
  initSidebarToggle();

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Format Taka amounts (keep existing logic)
  const takaElements = document.querySelectorAll('.taka-symbol');
  takaElements.forEach(element => {
    const text = element.textContent;
    if (text && !isNaN(parseFloat(text.replace(/,/g, '')))) {
      const number = parseFloat(text.replace(/,/g, ''));
      element.textContent = number.toLocaleString('en-BD', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  });

  // Initialize tooltips (if you have any)
  initTooltips();
});

function initSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mainContent = document.querySelector('.main-content');

  if (sidebar && sidebarToggle && mainContent) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('collapsed');
    });
  }
}

function initTooltips() {
  // Add tooltip logic if needed
}

function formatCurrency(amount) {
  return amount.toLocaleString('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}