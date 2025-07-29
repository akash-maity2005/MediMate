document.addEventListener('DOMContentLoaded', function() {
    // Service cards navigation
    const serviceCards = document.querySelectorAll('.service-card');
    const sections = {
        'ai-assistant': 'assistant-section',
        'health-profile': 'profile-section',
        'emergency': 'emergency-section',
        'medication': 'medication-section'
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards and sections
            serviceCards.forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.main-content section').forEach(s => s.classList.remove('active-section'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = sections[this.id];
            if (sectionId) {
                document.getElementById(sectionId).classList.add('active-section');
            }
        });
    });

    // Chat functionality
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        
        const messageP = document.createElement('p');
        messageP.textContent = message;
        messageDiv.appendChild(messageP);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate AI response after a short delay
            setTimeout(() => {
                const responses = [
                    "I understand how you're feeling. Can you tell me more about what's on your mind?",
                    "That sounds challenging. Would you like to explore some coping strategies?",
                    "Thank you for sharing. Remember that it's okay to feel this way. How can I support you right now?",
                    "I hear you. Let's work through this together. What would be most helpful for you at this moment?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, false);
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Tab functionality for medication section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Emergency buttons functionality
    const emergencyBtns = document.querySelectorAll('.emergency-btn');
    
    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            
            if (btnText.includes('Call Emergency Services')) {
                alert('Calling emergency services (911). Please stay on the line.');
            } else if (btnText.includes('Share Location')) {
                alert('Your location is being shared with emergency services.');
            } else if (btnText.includes('Crisis Resources')) {
                window.open('https://www.crisistextline.org/', '_blank');
            }
        });
    });

    // Directions buttons functionality
    const directionsBtns = document.querySelectorAll('.directions-btn');
    
    directionsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Opening directions in your preferred maps application.');
        });
    });

    // Save profile button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            alert('Profile information saved successfully.');
        });
    }
});