// ============================================
// Lab 07 - Keyboard Reaction Time Test
// Letter = Press A | Number = Press L
// ============================================

// ===== VARIABLES (as per flowchart) =====
let trials = 0;      // Number of trials completed
let correct = 0;     // Number of correct answers
let sumRT = 0;       // Sum of all reaction times (for average)
let avgRT = 0;       // Average reaction time

let currentStimulus = '';   // Current letter or number shown
let currentType = '';        // 'letter' or 'number'
let startTime = 0;           // When stimulus appeared
let isActive = false;        // Is test running?

const MAX_TRIALS = 10;       // Total trials needed

// ===== DOM Elements =====
const stimulusDiv = document.getElementById('stimulus');
const trialSpan = document.getElementById('trial');
const correctSpan = document.getElementById('correct');
const lastRTSpan = document.getElementById('lastRT');
const avgRTSpan = document.getElementById('avgRT');
const statusDiv = document.getElementById('status');

// ===== Helper Functions =====

// Get random letter (A to Z)
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * 26);
    return letters[randomIndex];
}

// Get random number (0 to 9)
function getRandomNumber() {
    return Math.floor(Math.random() * 10).toString();
}

// Generate new stimulus (random letter or number)
function generateStimulus() {
    const isLetter = Math.random() < 0.5;  // 50% chance letter, 50% number
    
    if (isLetter) {
        currentStimulus = getRandomLetter();
        currentType = 'letter';
    } else {
        currentStimulus = getRandomNumber();
        currentType = 'number';
    }
    
    // Display the stimulus on screen
    stimulusDiv.textContent = currentStimulus;
    
    // Start timer (record when stimulus appeared)
    startTime = Date.now();
    
    // Update status
    statusDiv.innerHTML = '⏱️ Waiting for your response...';
    statusDiv.style.background = '#fff3e0';
}

// Update all stats on screen
function updateDisplay() {
    trialSpan.textContent = trials;
    correctSpan.textContent = correct;
    
    if (trials > 0 && correct > 0) {
        avgRT = (sumRT / correct).toFixed(0);
        avgRTSpan.textContent = avgRT;
    }
}

// Show final results when test ends
function showResults() {
    isActive = false;
    const accuracy = (correct / trials * 100).toFixed(1);
    
    // Change stimulus box to green
    stimulusDiv.textContent = '✓';
    stimulusDiv.style.background = 'linear-gradient(135deg, #28a745, #1e7e34)';
    
    // Show final stats
    statusDiv.innerHTML = `
        🎉 TEST COMPLETE! 🎉<br>
        Accuracy: ${accuracy}% | Average RT: ${avgRT}ms<br>
        Press SPACE to try again
    `;
    statusDiv.style.background = '#e8f5e9';
}

// Reset everything and start new test
function startTest() {
    // Reset all variables
    trials = 0;
    correct = 0;
    sumRT = 0;
    avgRT = 0;
    isActive = true;
    
    // Reset visual elements
    stimulusDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    statusDiv.innerHTML = '⚡ Test started! Press A (Letter) or L (Number)';
    statusDiv.style.background = '#e8f4f8';
    lastRTSpan.textContent = '—';
    avgRTSpan.textContent = '—';
    
    // Generate first stimulus
    generateStimulus();
    updateDisplay();
}

// ===== Main Logic: Handle Key Press =====
function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    
    // If test is not active, check for SPACE to start
    if (!isActive) {
        if (key === ' ' || key === 'space') {
            startTest();
        }
        return;
    }
    
    // Only process if user pressed A or L
    if (key === 'a' || key === 'l') {
        
        // Calculate Reaction Time (rt = endTime - startTime)
        const reactionTime = Date.now() - startTime;
        
        let isCorrect = false;
        let expectedKey = '';
        
        // Check if answer is correct
        if (currentType === 'letter') {
            expectedKey = 'a';
            isCorrect = (key === 'a');
        } else {
            expectedKey = 'l';
            isCorrect = (key === 'l');
        }
        
        // Process the response
        if (isCorrect) {
            correct++;
            sumRT += reactionTime;
            lastRTSpan.textContent = reactionTime;
            statusDiv.innerHTML = `✅ CORRECT! (${reactionTime} ms)`;
            statusDiv.style.background = '#e8f5e9';
        } else {
            statusDiv.innerHTML = `❌ WRONG! Expected ${expectedKey.toUpperCase()} (${reactionTime} ms)`;
            statusDiv.style.background = '#ffebee';
        }
        
        // Increment trial counter
        trials++;
        
        // Update display
        updateDisplay();
        
        // Check if test is complete
        if (trials >= MAX_TRIALS) {
            showResults();
        } else {
            // Generate next stimulus
            generateStimulus();
        }
    }
}

// ===== Add Event Listener =====
document.addEventListener('keydown', handleKeyPress);

// ===== Initial Message =====
statusDiv.innerHTML = 'Press SPACE to start';
stimulusDiv.textContent = '?';
