// API base URL configuration for Vercel deployment
const API_BASE = window.location.hostname === 'localhost' ? '' : '/api';
document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    window.location.href = 'index.html';
    return;
  }

  // Update greeting
  const greetingHeader = document.querySelector('.greeting-card h1');
  if (greetingHeader) {
    greetingHeader.textContent = `Welcome back, ${user.firstName}!`;
  }

  // Fetch and update stats
  async function loadStats() {
    try {
      const response = await fetch('${API_BASE}/api/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      const totalBalance = document.querySelector('.stat-card.income .stat-amount');
      const expenses = document.querySelector('.stat-card.expense .stat-amount');
      const savings = document.querySelector('.stat-card.savings .stat-amount');
      if (totalBalance) totalBalance.textContent = data.totalBalance.toLocaleString('en-BD', { minimumFractionDigits: 2 });
      if (expenses) expenses.textContent = data.expenses.toLocaleString('en-BD', { minimumFractionDigits: 2 });
      if (savings) savings.textContent = data.savings.toLocaleString('en-BD', { minimumFractionDigits: 2 });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }

  // Fetch and update accounts
  async function loadAccounts() {
    try {
      const response = await fetch('${API_BASE}/api/banks', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const banks = await response.json();
      if (banks.error) {
        alert(banks.error);
        return;
      }
      const accountsContainer = document.querySelector('.accounts-overview');
      accountsContainer.innerHTML = ''; // Clear static content
      banks.forEach(bank => {
        const accountCard = `
          <div class="account-card">
            <div class="account-header">
              <div class="account-icon">
                <i class="fas fa-landmark"></i>
              </div>
              <div class="account-info">
                <h3>${bank.bankName}</h3>
                <p>${bank.accountType.charAt(0).toUpperCase() + bank.accountType.slice(1)} Account • **** ${bank.accountNumber.slice(-4)}</p>
              </div>
            </div>
            <div class="account-body">
              <div class="account-balance taka-symbol">${bank.balance.toLocaleString('en-BD', { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="account-footer">
              <div class="spending-progress">
                <div class="spending-text">
                  <span>Spending</span>
                  <span class="taka-symbol">0.00</span>
                </div>
                <div class="progress-container">
                  <div class="progress-value" style="width: 0%"></div>
                </div>
              </div>
            </div>
          </div>`;
        accountsContainer.insertAdjacentHTML('beforeend', accountCard);
      });
    } catch (err) {
      console.error('Error loading accounts:', err);
    }
  }

  // Fetch and update recent transactions
  async function loadTransactions() {
    try {
      const response = await fetch('${API_BASE}/api/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const transactions = await response.json();
      if (transactions.error) {
        alert(transactions.error);
        return;
      }
      const activityList = document.querySelector('.activity-list');
      activityList.innerHTML = ''; // Clear static content
      transactions.forEach(t => {
        const iconClass = t.category.toLowerCase();
        const amountClass = t.type === 'expense' ? 'negative' : 'positive';
        const sign = t.type === 'expense' ? '-' : '+';
        const activityItem = `
          <div class="activity-item">
            <div class="activity-icon ${iconClass}">
              <i class="fas fa-${iconClass === 'shopping' ? 'shopping-bag' : iconClass === 'housing' ? 'home' : iconClass === 'income' ? 'money-bill-wave' : 'gas-pump'}"></i>
            </div>
            <div class="activity-details">
              <h4>${t.description}</h4>
              <p>${t.category} • ${new Date(t.date).toLocaleDateString()}</p>
            </div>
            <div class="activity-amount ${amountClass}">${sign}<span class="taka-symbol">${t.amount.toLocaleString('en-BD', { minimumFractionDigits: 2 })}</span></div>
          </div>`;
        activityList.insertAdjacentHTML('beforeend', activityItem);
      });
    } catch (err) {
      console.error('Error loading transactions:', err);
    }
  }

  loadStats();
  loadAccounts();
  loadTransactions();
});