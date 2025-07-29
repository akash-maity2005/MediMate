// DOM Elements
const nextToStep2 = document.getElementById('nextToStep2');
const backToStep1 = document.getElementById('backToStep1');
const nextToStep3 = document.getElementById('nextToStep3');
const backToStep2 = document.getElementById('backToStep2');
const submitAssessment = document.getElementById('submitAssessment');
const saveAssessment = document.getElementById('saveAssessment');
const physicalConcern = document.getElementById('physicalConcern');

// Get all steps and step indicators
const steps = document.querySelectorAll('.assessment-step');
const stepIndicators = document.querySelectorAll('.step');

// Function to go to a specific step
function goToStep(stepNumber) {
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Show the selected step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
        if (index < stepNumber - 1) {
            indicator.classList.add('completed');
            indicator.classList.remove('active');
        } else if (index === stepNumber - 1) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
        } else {
            indicator.classList.remove('active', 'completed');
        }
    });
}

// Initialize - start at step 1
goToStep(1);

// Event listeners for navigation
if (nextToStep2) {
    nextToStep2.addEventListener('click', function() {
        goToStep(2);
    });
}

if (backToStep1) {
    backToStep1.addEventListener('click', function() {
        goToStep(1);
    });
}

if (nextToStep3) {
    nextToStep3.addEventListener('click', function() {
        // Validate step 2 before proceeding
        const form = document.getElementById('mentalHealthForm');
        const inputs = form.querySelectorAll('input[type="radio"]:checked');
        
        if (inputs.length < 3) {
            alert('Please answer all questions before continuing.');
            return;
        }
        
        goToStep(3);
    });
}

if (backToStep2) {
    backToStep2.addEventListener('click', function() {
        goToStep(2);
    });
}

if (submitAssessment) {
    submitAssessment.addEventListener('click', function() {
        // Here you would typically send the assessment data to your backend
        // For demo purposes, we'll just show the results
        goToStep(4);
        
        // Simulate loading
        const resultHeader = document.querySelector('.result-header h2');
        resultHeader.textContent = 'Analyzing your responses...';
        
        setTimeout(() => {
            resultHeader.textContent = 'Assessment Results';
        }, 1500);
    });
}

if (saveAssessment) {
    saveAssessment.addEventListener('click', function() {
        // Here you would typically save the results to the user's profile
        alert('Assessment results saved to your profile.');
        window.location.href = 'dashboard.html';
    });
}

// Physical concern selection
if (physicalConcern) {
    physicalConcern.addEventListener('change', function() {
        if (this.checked) {
            alert('Physical symptom assessment will be implemented in a future update.');
            document.getElementById('psychologicalConcern').checked = true;
        }
    });
}