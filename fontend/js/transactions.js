// API base URL configuration for Vercel deployment
const API_BASE = window.location.hostname === 'localhost' ? '' : '/api';
// Transactions page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters
    initFilters();
    
    // Initialize table sorting
    initTableSorting();
    
    // Initialize pagination
    initPagination();
});

function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-group select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // In a real app, this would filter the transactions
            console.log(`Filter changed: ${this.id} = ${this.value}`);
        });
    });
}

function initTableSorting() {
    const tableHeaders = document.querySelectorAll('.transactions-table th');
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // In a real app, this would sort the table
            console.log(`Sorting by: ${this.textContent}`);
        });
    });
}

function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination .btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would change the page
            console.log(`Pagination button clicked: ${this.textContent}`);
        });
    });
}