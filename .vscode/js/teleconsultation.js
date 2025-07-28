document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Join call button functionality
    const joinBtns = document.querySelectorAll('.join-btn');
    const callModal = document.getElementById('callModal');
    const endCallBtn = document.querySelector('.end-call-btn');
    
    joinBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            callModal.style.display = 'block';
            startCallTimer();
        });
    });
    
    if (endCallBtn) {
        endCallBtn.addEventListener('click', function() {
            callModal.style.display = 'none';
            stopCallTimer();
        });
    }
    
    // Other button functionalities
    const buttons = [
        '.reschedule-btn',
        '.followup-btn',
        '.view-summary-btn',
        '.download-btn',
        '.refill-btn',
        '.view-details-btn',
        '.book-appointment-btn',
        '.new-consultation-btn'
    ];
    
    buttons.forEach(selector => {
        document.querySelectorAll(selector).forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (!this.getAttribute('href')) {
                    e.preventDefault();
                    const action = this.querySelector('span').textContent;
                    alert(`${action} feature will be implemented soon!`);
                }
            });
        });
    });
    
    // Call timer functionality
    let callTimer;
    let callSeconds = 0;
    const callDuration = document.querySelector('.call-duration');
    
    function startCallTimer() {
        callSeconds = 0;
        updateCallTimer();
        callTimer = setInterval(updateCallTimer, 1000);
    }
    
    function stopCallTimer() {
        clearInterval(callTimer);
    }
    
    function updateCallTimer() {
        callSeconds++;
        const minutes = Math.floor(callSeconds / 60);
        const seconds = callSeconds % 60;
        callDuration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Control buttons functionality
    const controlBtns = document.querySelectorAll('.control-btn');
    
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const action = this.querySelector('span').textContent;
            
            // Toggle between on/off states
            if (action.includes('Off')) {
                this.querySelector('span').textContent = action.replace('Off', 'On');
                icon.classList.remove('fa-video');
                icon.classList.add('fa-video-slash');
            } else if (action.includes('On')) {
                this.querySelector('span').textContent = action.replace('On', 'Off');
                icon.classList.remove('fa-video-slash');
                icon.classList.add('fa-video');
            } else if (action === 'Mute') {
                this.querySelector('span').textContent = 'Unmute';
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
            } else if (action === 'Unmute') {
                this.querySelector('span').textContent = 'Mute';
                icon.classList.remove('fa-microphone-slash');
                icon.classList.add('fa-microphone');
            }
            
            // For demo purposes, show a message
            if (action === 'Notes') {
                alert('Consultation notes feature will be implemented soon!');
            } else if (action === 'Share Screen') {
                alert('Screen sharing feature will be implemented soon!');
            }
        });
    });
});