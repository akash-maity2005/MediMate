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
    document.addEventListener('DOMContentLoaded', function() {
  const concernTypeSelect = document.getElementById('concern-type');
  const symptomsGroup = document.querySelector('.symptoms-group');
  const assessBtn = document.getElementById('assess-btn');
  const teleconsultBtn = document.getElementById('teleconsult-btn');
  const assessmentResults = document.querySelector('.assessment-results');
  const resultsContent = document.querySelector('.results-content');

  // Show symptoms field when concern type is selected
  concernTypeSelect.addEventListener('change', function() {
    if (this.value) {
      symptomsGroup.style.display = 'block';
      assessBtn.disabled = false;
    } else {
      symptomsGroup.style.display = 'none';
      assessBtn.disabled = true;
      assessmentResults.style.display = 'none';
      teleconsultBtn.style.display = 'none';
    }
  });

  // Handle assessment submission
  assessBtn.addEventListener('click', function() {
    const concernType = concernTypeSelect.value;
    const symptoms = document.getElementById('symptoms').value;
    
    if (!symptoms.trim()) {
      alert('Please describe your symptoms');
      return;
    }
    
    // Show loading state
    assessBtn.disabled = true;
    assessBtn.textContent = 'Assessing...';
    
    // Simulate API call with timeout
    setTimeout(function() {
      // Generate mock assessment results based on concern type
      let results = generateAssessmentResults(concernType, symptoms);
      
      // Display results
      resultsContent.innerHTML = results;
      assessmentResults.style.display = 'block';
      teleconsultBtn.style.display = 'inline-block';
      
      // Reset button
      assessBtn.disabled = false;
      assessBtn.textContent = 'Reassess';
    }, 1500);
  });
  
  // Teleconsultation button handler
  teleconsultBtn.addEventListener('click', function() {
    alert('Teleconsultation request has been sent. A healthcare professional will contact you shortly.');
  });
  
  // Helper function to generate mock assessment results
  function generateAssessmentResults(type, symptoms) {
    const recommendations = {
      mental: [
        "Practice mindfulness meditation for 10 minutes daily",
        "Consider talking to a mental health professional",
        "Maintain a regular sleep schedule",
        "Engage in physical activity for at least 30 minutes daily"
      ],
      physical: [
        "Rest and stay hydrated",
        "Monitor your symptoms for 48 hours",
        "Take over-the-counter pain relief if needed",
        "Seek immediate medical attention if symptoms worsen"
      ],
      nutrition: [
        "Increase your intake of fruits and vegetables",
        "Reduce processed food consumption",
        "Stay hydrated with at least 8 glasses of water daily",
        "Consider consulting a nutritionist for personalized advice"
      ],
      sleep: [
        "Maintain a consistent sleep schedule",
        "Avoid screens 1 hour before bedtime",
        "Create a relaxing bedtime routine",
        "Ensure your sleeping environment is dark and quiet"
      ]
    };
    
    const severity = ["Mild", "Moderate", "Severe"][Math.floor(Math.random() * 3)];
    const concernTypes = {
      mental: "Mental Health Concern",
      physical: "Physical Health Concern",
      nutrition: "Nutritional Concern",
      sleep: "Sleep-Related Concern"
    };
    
    return `
      <h4>${concernTypes[type]} Assessment</h4>
      <p><strong>Symptoms Reported:</strong> ${symptoms}</p>
      <p><strong>Severity:</strong> ${severity}</p>
      <div class="recommendations">
        <h5>Recommendations:</h5>
        <ul>
          ${recommendations[type].map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
      <p class="disclaimer"><em>Note: This assessment is not a substitute for professional medical advice. Always consult with a healthcare provider for serious concerns.</em></p>
    `;
  }
});
}
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const concernCards = document.querySelectorAll('.concern-card');
  const concernTypeSelection = document.querySelector('.concern-type-selection');
  const symptomsForm = document.querySelector('.symptoms-form');
  const assessmentResults = document.querySelector('.assessment-results');
  const continueBtn = document.querySelector('.continue-btn');
  const backBtn = document.querySelector('.back-btn');
  const steps = document.querySelectorAll('.step');
  const symptomsTextarea = document.getElementById('symptoms-details');
  
  let selectedConcernType = null;

  // Concern type selection
  concernCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected class from all cards
      concernCards.forEach(c => c.classList.remove('selected'));
      
      // Add selected class to clicked card
      this.classList.add('selected');
      selectedConcernType = this.dataset.type;
      
      // Update stepper
      steps[0].classList.remove('active');
      steps[1].classList.add('active');
      
      // Show symptoms form
      concernTypeSelection.style.display = 'none';
      symptomsForm.style.display = 'block';
    });
  });

  // Back button (from symptoms to concern type)
  backBtn.addEventListener('click', function() {
    symptomsForm.style.display = 'none';
    concernTypeSelection.style.display = 'block';
    steps[1].classList.remove('active');
    steps[0].classList.add('active');
  });

  // Continue button (from symptoms to assessment)
  continueBtn.addEventListener('click', function() {
    if (!symptomsTextarea.value.trim()) {
      alert('Please describe your symptoms before continuing');
      return;
    }
    
    // Show loading state
    continueBtn.disabled = true;
    continueBtn.textContent = 'Assessing...';
    
    // Simulate assessment processing
    setTimeout(function() {
      // Update stepper
      steps[1].classList.remove('active');
      steps[2].classList.add('active');
      
      // Show results
      symptomsForm.style.display = 'none';
      assessmentResults.style.display = 'block';
      
      // Generate results
      generateAssessmentResults();
      
      // Reset button (though it's hidden now)
      continueBtn.disabled = false;
      continueBtn.textContent = 'Continue';
    }, 2000);
  });

  // Function to generate assessment results
  function generateAssessmentResults() {
    const concernTypes = {
      physical: "Physical Health Concern",
      psychological: "Psychological Health Concern",
      nutrition: "Nutritional Concern"
    };
    
    const severityLevels = ["Mild", "Moderate", "Severe"];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    
    const recommendations = {
      physical: [
        "Rest and stay hydrated",
        "Consider over-the-counter pain relief if needed",
        "Monitor symptoms for 48 hours",
        "Seek immediate medical attention if symptoms worsen"
      ],
      psychological: [
        "Practice deep breathing exercises",
        "Consider mindfulness meditation",
        "Maintain a regular sleep schedule",
        "Reach out to a mental health professional if symptoms persist"
      ],
      nutrition: [
        "Increase intake of fruits and vegetables",
        "Reduce processed food consumption",
        "Stay hydrated with water throughout the day",
        "Consider consulting a nutritionist for personalized advice"
      ]
    };
    
    const blockchainNote = `
      <div class="result-item">
        <h4>Blockchain Health Record</h4>
        <p>Your assessment has been securely recorded on the blockchain.</p>
        <p>Transaction Hash: 0x${Math.random().toString(16).substr(2, 64)}</p>
      </div>
    `;
    
    assessmentResults.innerHTML = `
      <h3>Assessment Results</h3>
      
      <div class="result-item">
        <h4>Concern Type</h4>
        <p>${concernTypes[selectedConcernType]}</p>
      </div>
      
      <div class="result-item">
        <h4>Reported Symptoms</h4>
        <p>${symptomsTextarea.value}</p>
      </div>
      
      <div class="result-item">
        <h4>Initial Severity Assessment</h4>
        <p>${severity}</p>
      </div>
      
      <div class="recommendations">
        <h4>Recommendations</h4>
        <ul>
          ${recommendations[selectedConcernType].map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
      
      ${blockchainNote}
      
      <div class="form-actions">
        <button class="btn-secondary" id="new-assessment-btn">Start New Assessment</button>
        <button class="btn-primary" id="teleconsult-btn">Request Teleconsultation</button>
      </div>
    `;
    
    // Add event listeners to new buttons
    document.getElementById('new-assessment-btn').addEventListener('click', resetAssessment);
    document.getElementById('teleconsult-btn').addEventListener('click', function() {
      alert('Teleconsultation request has been sent. A healthcare professional will contact you shortly.');
    });
  }
  
  // Reset the assessment flow
  function resetAssessment() {
    // Reset form
    symptomsTextarea.value = '';
    concernCards.forEach(c => c.classList.remove('selected'));
    selectedConcernType = null;
    
    // Reset stepper
    steps[2].classList.remove('active');
    steps[0].classList.add('active');
    
    // Show first step
    assessmentResults.style.display = 'none';
    concernTypeSelection.style.display = 'block';
  }
});
