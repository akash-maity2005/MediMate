// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const switchToLogin = document.getElementById('switchToLogin');
const switchToSignup = document.getElementById('switchToSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Show Login Modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
    signupModal.style.display = 'none';
});

// Show Signup Modal
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'block';
    loginModal.style.display = 'none';
});

// Close Modals
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

// Switch to Login from Signup
switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
    signupModal.style.display = 'none';
});

// Switch to Signup from Login
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'block';
    loginModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Here you would typically send this data to your backend
    console.log('Login attempt with:', { email, password, rememberMe });
    
    // For demo purposes, we'll just redirect to dashboard
    window.location.href = 'pages/dashboard.html';
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Here you would typically send this data to your backend
    console.log('Signup attempt with:', { fullName, email, password });
    
    // For demo purposes, we'll just redirect to dashboard
    window.location.href = 'pages/dashboard.html';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});