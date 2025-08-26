document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found, redirecting to index.html');
    window.location.href = 'index.html';
    return;
  }

  // Connect Bank Form
  const connectBankForm = document.getElementById('connectBankForm');
  if (connectBankForm) {
    connectBankForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const bankName = document.getElementById('bankName').value;
      const accountNumber = document.getElementById('accountNumber').value;
      const accountType = document.getElementById('accountType').value;
      const routingNumber = document.getElementById('routingNumber').value;
      const initialBalance = parseFloat(document.getElementById('initialBalance').value);
      
      if (!bankName || !accountNumber || !accountType || !routingNumber || isNaN(initialBalance)) {
        alert('Please fill in all fields correctly');
        return;
      }

      try {
        const response = await fetch('/api/banks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ bankName, accountNumber, accountType, routingNumber, balance: initialBalance })
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          console.error('Bank error:', data.error);
          return;
        }
        alert('Bank connected successfully!');
        window.location.href = 'my-banks.html';
      } catch (err) {
        alert('Failed to connect bank');
        console.error('Error connecting bank:', err);
      }
    });
  }

  // Load banks for my-banks.html
  async function loadBanks() {
    try {
      const response = await fetch('/api/banks', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const banks = await response.json();
      console.log('Fetched banks:', banks); // Debug log
      if (banks.error) {
        console.error('Banks error:', banks.error);
        alert('Failed to load banks: ' + banks.error);
        return;
      }
      const bankList = document.querySelector('.bank-list');
      if (bankList) {
        bankList.innerHTML = ''; // Clear existing content
        if (banks.length === 0) {
          bankList.innerHTML = '<p>No banks connected yet.</p>';
        } else {
          banks.forEach(bank => {
            const bankItem = `
              <div class="bank-card">
                <h3>${bank.bankName}</h3>
                <p>${bank.accountType.charAt(0).toUpperCase() + bank.accountType.slice(1)} Account • ****${bank.accountNumber.slice(-4)}</p>
                <p class="taka-symbol">${bank.balance.toLocaleString('en-BD', { minimumFractionDigits: 2 })}</p>
              </div>`;
            bankList.insertAdjacentHTML('beforeend', bankItem);
          });
        }
      } else {
        console.error('Bank list element not found');
      }
    } catch (err) {
      console.error('Error loading banks:', err);
      alert('Error loading banks');
    }
  }

  if (document.querySelector('.bank-list')) {
    console.log('Loading banks for my-banks.html');
    loadBanks();
  }
});