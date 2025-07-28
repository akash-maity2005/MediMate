document.addEventListener('DOMContentLoaded', function() {
    // Logout button functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Here you would typically clear session data
            // For demo, we'll just redirect to the homepage
            window.location.href = '../index.html';
        });
    }
    
    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('Notifications feature will be implemented soon!');
        });
    }
    
    // Wallet balance click
    const walletBalance = document.querySelector('.wallet-balance');
    if (walletBalance) {
        walletBalance.addEventListener('click', function() {
            window.location.href = 'wallet.html';
        });
    }
    
    // Quick action buttons
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('This feature will be implemented soon!');
            }
        });
    });
    
    // View all links
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('This feature will be implemented soon!');
            });
        }
    });
    
    // Appointment buttons
    const appointmentBtns = document.querySelectorAll('.appointment-actions .btn');
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                const action = this.textContent.trim();
                alert(`${action} feature will be implemented soon!`);
            }
        });
    });
});