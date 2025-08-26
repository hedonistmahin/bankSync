// Dashboard specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize spending chart
    initSpendingChart();
    
    // Update account balances
    updateAccountBalances();
});

function initSpendingChart() {
    const canvas = document.getElementById('spendingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Sample data for the chart
    const data = {
        labels: ['Housing', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities'],
        datasets: [{
            label: 'Spending by Category',
            data: [1250, 420, 180, 250, 90, 150],
            backgroundColor: [
                '#3b82f6',
                '#10b981',
                '#8b5cf6',
                '#f59e0b',
                '#ef4444',
                '#06b6d4'
            ],
            borderWidth: 0
        }]
    };
    
    // Draw a simple bar chart
    const barWidth = 40;
    const spacing = 20;
    const maxValue = Math.max(...data.datasets[0].data);
    
    data.datasets[0].data.forEach((value, index) => {
        const x = index * (barWidth + spacing) + 50;
        const barHeight = (value / maxValue) * 200;
        const y = canvas.height - barHeight - 50;
        
        // Draw bar
        ctx.fillStyle = data.datasets[0].backgroundColor[index];
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(data.labels[index], x + barWidth/2, canvas.height - 20);
        
        // Draw value
        ctx.fillText(`$${value}`, x + barWidth/2, y - 10);
    });
}

function updateAccountBalances() {
    // This would normally fetch data from an API
    // For now, we'll just simulate updating balances
    console.log('Account balances updated');
}