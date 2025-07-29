const consultationData = {
    upcoming: [
        {
            id: 1,
            doctor: {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiologist",
                avatar: "assets/images/doctor1.jpg"
            },
            date: "Tomorrow, May 15, 2025",
            time: "10:00 AM - 10:30 AM (30 mins)",
            status: "upcoming"
        },
        {
            id: 2,
            doctor: {
                name: "Dr. Michael Chen",
                specialty: "Neurologist",
                avatar: "assets/images/doctor2.jpg"
            },
            date: "May 20, 2025",
            time: "2:30 PM - 3:00 PM (30 mins)",
            status: "upcoming"
        }
    ],
    past: [
        {
            id: 3,
            doctor: {
                name: "Dr. Emily Rodriguez",
                specialty: "General Practitioner",
                avatar: "assets/images/doctor3.jpg"
            },
            date: "April 28, 2025",
            time: "11:15 AM - 11:45 AM (30 mins)",
            method: "Audio Call",
            status: "completed"
        },
        {
            id: 4,
            doctor: {
                name: "Dr. James Wilson",
                specialty: "Pulmonologist",
                avatar: "assets/images/doctor4.jpg"
            },
            date: "April 15, 2025",
            time: "3:45 PM - 4:15 PM (30 mins)",
            method: "Video Call",
            status: "completed"
        }
    ],
    prescriptions: [
        {
            id: "12345",
            doctor: "Dr. Emily Rodriguez",
            date: "April 28, 2025",
            status: "Active",
            medications: [
                {
                    name: "Amoxicillin 500mg",
                    type: "Antibiotic",
                    dosage: "Take 1 capsule by mouth 3 times daily for 10 days",
                    refills: "0 remaining"
                },
                {
                    name: "Ibuprofen 400mg",
                    type: "Pain Reliever",
                    dosage: "Take 1 tablet by mouth every 6 hours as needed for pain",
                    refills: "2 remaining"
                }
            ]
        }
    ],
    referrals: [
        {
            doctor: "Dr. James Wilson",
            date: "April 15, 2025",
            referredTo: "Dr. Sarah Johnson, Cardiologist",
            reason: "Follow-up evaluation for abnormal heart rhythm"
        }
    ]
};

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const upcomingTab = document.getElementById('upcoming-tab');
const pastTab = document.getElementById('past-tab');
const prescriptionsTab = document.getElementById('prescriptions-tab');
const callModal = document.getElementById('callModal');
const endCallBtn = document.querySelector('.end-call-btn');
const callDuration = document.querySelector('.call-duration');
const controlBtns = document.querySelectorAll('.control-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load data into tabs
    loadUpcomingConsultations();
    loadPastConsultations();
    loadPrescriptions();
    
    // Set up tab functionality
    setupTabs();
    
    // Set up call modal functionality
    setupCallModal();
    
    // Set up control buttons
    setupControlButtons();
    
    // Set up other buttons
    setupButtons();
});

// Load upcoming consultations
function loadUpcomingConsultations() {
    let html = '';
    
    consultationData.upcoming.forEach(consultation => {
        html += `
        <div class="consultation-card" data-id="${consultation.id}">
            <div class="consultation-header">
                <div class="doctor-info">
                    <img src="${consultation.doctor.avatar}" alt="${consultation.doctor.name}" class="doctor-avatar">
                    <div>
                        <h3>${consultation.doctor.name}</h3>
                        <p class="text-gray">${consultation.doctor.specialty}</p>
                        <div class="consultation-meta">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${consultation.date}</span>
                        </div>
                        <div class="consultation-meta">
                            <i class="fas fa-clock"></i>
                            <span>${consultation.time}</span>
                        </div>
                    </div>
                </div>
                <span class="consultation-status ${consultation.status}">
                    ${consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
            </div>
            <div class="consultation-actions">
                <button class="btn btn-outline reschedule-btn">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Reschedule</span>
                </button>
                <button class="btn btn-primary join-btn">
                    <i class="fas fa-video"></i>
                    <span>Join Call</span>
                </button>
            </div>
        </div>
        `;
    });
    
    html += `
    <button class="btn btn-outline new-consultation-btn">
        <i class="fas fa-plus"></i>
        <span>Book New Consultation</span>
    </button>
    `;
    
    upcomingTab.innerHTML = html;
    
    // Add event listeners to new buttons
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.consultation-card');
            const doctorName = card.querySelector('h3').textContent;
            const doctorAvatar = card.querySelector('img').src;
            
            openCallModal(doctorName, doctorAvatar);
        });
    });
}

// Load past consultations
function loadPastConsultations() {
    let html = '';
    
    consultationData.past.forEach(consultation => {
        html += `
        <div class="consultation-card" data-id="${consultation.id}">
            <div class="consultation-header">
                <div class="doctor-info">
                    <img src="${consultation.doctor.avatar}" alt="${consultation.doctor.name}" class="doctor-avatar">
                    <div>
                        <h3>${consultation.doctor.name}</h3>
                        <p class="text-gray">${consultation.doctor.specialty}</p>
                        <div class="consultation-meta">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${consultation.date}</span>
                        </div>
                        <div class="consultation-meta">
                            <i class="fas fa-clock"></i>
                            <span>${consultation.time}</span>
                        </div>
                        <div class="consultation-meta">
                            <i class="fas fa-${consultation.method === 'Video Call' ? 'video' : 'phone-alt'}"></i>
                            <span>${consultation.method}</span>
                        </div>
                    </div>
                </div>
                <span class="consultation-status ${consultation.status}">
                    ${consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
            </div>
            <div class="consultation-actions">
                <button class="btn btn-outline view-summary-btn">
                    <i class="fas fa-file-alt"></i>
                    <span>View Summary</span>
                </button>
                <button class="btn btn-primary followup-btn">
                    <i class="fas fa-calendar-plus"></i>
                    <span>Book Follow-up</span>
                </button>
            </div>
        </div>
        `;
    });
    
    pastTab.innerHTML = html;
}

// Load prescriptions
function loadPrescriptions() {
    let html = '';
    
    consultationData.prescriptions.forEach(prescription => {
        html += `
        <div class="prescription-card">
            <div class="prescription-header">
                <h3>Prescription #${prescription.id}</h3>
                <span class="prescription-status ${prescription.status.toLowerCase()}">
                    ${prescription.status}
                </span>
            </div>
            
            <div class="prescription-meta">
                <p><strong>Prescribed by:</strong> ${prescription.doctor}</p>
                <p><strong>Date:</strong> ${prescription.date}</p>
            </div>
            
            <div class="medication-list">
        `;
        
        prescription.medications.forEach(med => {
            html += `
            <div class="medication-item">
                <div class="medication-name">
                    <h4>${med.name}</h4>
                    <span class="medication-type">${med.type}</span>
                </div>
                <div class="medication-details">
                    <p><strong>Dosage:</strong> ${med.dosage}</p>
                    <p><strong>Refills:</strong> ${med.refills}</p>
                </div>
            </div>
            `;
        });
        
        html += `
            </div>
            
            <div class="prescription-actions">
                <button class="btn btn-outline download-btn">
                    <i class="fas fa-download"></i>
                    <span>Download PDF</span>
                </button>
                <button class="btn btn-primary refill-btn">
                    <i class="fas fa-sync-alt"></i>
                    <span>Request Refill</span>
                </button>
            </div>
        </div>
        `;
    });
    
    consultationData.referrals.forEach(referral => {
        html += `
        <div class="referral-card">
            <h3>Referral to Specialist</h3>
            
            <div class="referral-info">
                <p><strong>Referred by:</strong> ${referral.doctor}</p>
                <p><strong>Date:</strong> ${referral.date}</p>
                <p><strong>Referred to:</strong> ${referral.referredTo}</p>
                <p><strong>Reason:</strong> ${referral.reason}</p>
            </div>
            
            <div class="referral-actions">
                <button class="btn btn-outline view-details-btn">
                    <i class="fas fa-file-alt"></i>
                    <span>View Details</span>
                </button>
                <button class="btn btn-primary book-appointment-btn">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Book Appointment</span>
                </button>
            </div>
        </div>
        `;
    });
    
    prescriptionsTab.innerHTML = html;
}

// Set up tab functionality
function setupTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Set up call modal
function setupCallModal() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === callModal) {
            closeCallModal();
        }
    });
    
    // End call button
    if (endCallBtn) {
        endCallBtn.addEventListener('click', closeCallModal);
    }
}

// Open call modal
function openCallModal(doctorName, doctorAvatar) {
    // Update modal with doctor info
    const modalTitle = callModal.querySelector('.call-header h3');
    const doctorImg = callModal.querySelector('.doctor-video img');
    
    modalTitle.textContent = `Consultation with ${doctorName}`;
    doctorImg.src = doctorAvatar;
    doctorImg.alt = doctorName;
    
    // Show modal
    callModal.style.display = 'block';
    
    // Start call timer
    startCallTimer();
}

// Close call modal
function closeCallModal() {
    callModal.style.display = 'none';
    stopCallTimer();
}

// Call timer functionality
let callTimer;
let callSeconds = 0;

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

// Set up control buttons
function setupControlButtons() {
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            const action = text.textContent;
            
            // Toggle between on/off states
            if (action.includes('Off')) {
                text.textContent = action.replace('Off', 'On');
                if (icon.classList.contains('fa-video')) {
                    icon.classList.remove('fa-video');
                    icon.classList.add('fa-video-slash');
                }
            } else if (action.includes('On')) {
                text.textContent = action.replace('On', 'Off');
                if (icon.classList.contains('fa-video-slash')) {
                    icon.classList.remove('fa-video-slash');
                    icon.classList.add('fa-video');
                }
            } else if (action === 'Mute') {
                text.textContent = 'Unmute';
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
            } else if (action === 'Unmute') {
                text.textContent = 'Mute';
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
}

// Set up other button functionalities
function setupButtons() {
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
}