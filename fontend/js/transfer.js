// API base URL configuration for Vercel deployment
const API_BASE = window.location.hostname === 'localhost' ? '' : '/api';
// Transfer page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize transfer form
    initTransferForm();
    
    // Initialize account selection
    initAccountSelection();
});

function initTransferForm() {
    const form = document.getElementById('transferForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fromAccount = document.getElementById('fromAccount').value;
        const toAccount = document.getElementById('toAccount').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        
        // Validate form
        if (!fromAccount || !toAccount || !amount) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (parseFloat(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        // In a real app, this would submit the transfer
        alert(`Transfer of $${amount} from ${fromAccount} to ${toAccount} submitted successfully!`);
        
        // Reset form
        form.reset();
    });
}

function initAccountSelection() {
    const toAccountSelect = document.getElementById('toAccount');
    if (!toAccountSelect) return;
    
    toAccountSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            // In a real app, this would show a modal or additional fields
            alert('Please enter recipient details');
        }
    });
}