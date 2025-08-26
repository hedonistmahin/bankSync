document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!token || !user) {
    window.location.href = 'index.html';
    return;
  }

  // Update topbar with user info
  document.querySelector('.user-name').textContent = `${user.firstName} ${user.lastName}`;
  document.querySelector('.user-email').textContent = user.email;
  
  // Set avatar images
  const avatarImg = document.getElementById('avatar-img');
  const profileAvatarImg = document.getElementById('profile-avatar-img');
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=97B067&color=fff`;
  
  avatarImg.src = avatarUrl;
  avatarImg.alt = `${user.firstName} ${user.lastName}`;
  profileAvatarImg.src = avatarUrl;
  profileAvatarImg.alt = `${user.firstName} ${user.lastName}`;

  // Load profile data from API
  async function loadProfile() {
    try {
      const response = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      const userData = await response.json();
      
      // Update profile page with user data
      document.getElementById('profile-name').textContent = `${userData.firstName} ${userData.lastName}`;
      document.getElementById('profile-email').textContent = userData.email;
      document.getElementById('full-name').textContent = `${userData.firstName} ${userData.lastName}`;
      document.getElementById('email-address').textContent = userData.email;
      document.getElementById('phone-number').textContent = userData.phone || 'Not provided';
      document.getElementById('date-of-birth').textContent = userData.dob || 'Not provided';
      document.getElementById('address-text').textContent = userData.address || 'Not provided';
      
      // Set member since date (using current date as placeholder)
      const memberSince = document.getElementById('member-since-date');
      memberSince.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      // Load financial data
      await loadFinancialData();
      
    } catch (err) {
      console.error('Error loading profile:', err);
      alert('Error loading profile data');
    }
  }

  // Load financial information
  async function loadFinancialData() {
    try {
      // Fetch banks data
      const banksResponse = await fetch('/api/banks', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!banksResponse.ok) {
        throw new Error('Failed to fetch banks data');
      }
      
      const banks = await banksResponse.json();
      
      // Update accounts count
      document.getElementById('total-accounts').textContent = banks.length;
      
      // Calculate total balance
      const totalBalance = banks.reduce((sum, bank) => sum + (bank.balance || 0), 0);
      document.getElementById('total-balance').textContent = formatCurrency(totalBalance);
      
      // Fetch transactions for monthly calculations
      const transactionsResponse = await fetch('/api/transactions?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (transactionsResponse.ok) {
        const transactions = await transactionsResponse.json();
        
        // Calculate monthly income and expenses
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyIncome = transactions
          .filter(t => t.type === 'income' && 
                 new Date(t.date).getMonth() === currentMonth &&
                 new Date(t.date).getFullYear() === currentYear)
          .reduce((sum, t) => sum + (t.amount || 0), 0);
          
        const monthlyExpenses = transactions
          .filter(t => t.type === 'expense' && 
                 new Date(t.date).getMonth() === currentMonth &&
                 new Date(t.date).getFullYear() === currentYear)
          .reduce((sum, t) => sum + (t.amount || 0), 0);
          
        document.getElementById('monthly-income').textContent = formatCurrency(monthlyIncome);
        document.getElementById('monthly-expenses').textContent = formatCurrency(monthlyExpenses);
      }
      
    } catch (err) {
      console.error('Error loading financial data:', err);
    }
  }

  // Helper function to format currency
  function formatCurrency(amount) {
    return amount.toLocaleString('en-BD', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Initialize the page
  loadProfile();
});