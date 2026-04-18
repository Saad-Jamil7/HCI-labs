// Lab 07 - Keyboard Reaction Time Test
// Letter = Press 'A' | Number = Press 'L'

let trials = 0;
let correct = 0;
let sumRT = 0;
let currentStimulus = '';
let currentType = '';
let startTime = 0;
let isActive = false;

// DOM Elements
const stimulusDiv = document.getElementById('stimulus');
const trialCountSpan = document.getElementById('trialCount');
const correctCountSpan = document.getElementById('correctCount');
const lastRTSpan = document.getElementById('lastRT');
const avgRTSpan = document.getElementById('avgRT');
const statusDiv = document.getElementById('status');

const MAX_TRIALS = 10;

// Helper: Get random letter (A-Z)
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
}

// Helper: Get random number (0-9)
function getRandomNumber() {
    return Math.floor(Math.random() * 10).toString();
}

// Generate new stimulus
function generateStimulus() {
    const isLetter = Math.random() < 0.5;
    
    if (isLetter) {
        currentStimulus = getRandomLetter();
        currentType = 'letter';
    } else {
        currentStimulus = getRandomNumber();
        currentType = 'number';
    }
    
    stimulusDiv.textContent = currentStimulus;
    startTime = Date.now();
    statusDiv.innerHTML = '⏱️ Waiting for response...';
    statusDiv.style.background = '#fff3e0';
}

// Update display
function updateDisplay() {
    trialCountSpan.textContent = trials;
    correctCountSpan.textContent = correct;
    
    if (trials > 0) {
        const avgRT = (sumRT / correct).toFixed(0);
        avgRTSpan.textContent = avgRT;
    }
}

// Show final results
function showResults() {
    isActive = false;
    const accuracy = (correct / trials * 100).toFixed(1);
    const avgRT = (sumRT / correct).toFixed(0);
    
    stimulusDiv.textContent = '✓';
    stimulusDiv.style.background = 'linear-gradient(135deg, #28a745, #1e7e34)';
    
    statusDiv.innerHTML = `
        🎉 TEST COMPLETE! 🎉<br>
        Accuracy: ${accuracy}% | Average RT: ${avgRT}ms<br>
        Press SPACE to try again
    `;
    statusDiv.style.background = '#e8f5e9';
}

// Reset test
function resetTest() {
    trials = 0;
    correct = 0;
    sumRT = 0;
    isActive = true;
    
    stimulusDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    statusDiv.innerHTML = '⚡ Test started! Press A (Letter) or L (Number)';
    statusDiv.style.background = '#e8f4f8';
    
    generateStimulus();
    updateDisplay();
}

// Handle key press
function handleKeyPress(event) {
    if (!isActive) {
        if (event.key === ' ' || event.key === 'Space') {
            resetTest();
        }
        return;
    }
    
    const key = event.key.toLowerCase();
    const rt = Date.now() - startTime;
    
    let isCorrect = false;
    let expectedKey = '';
    
    if (currentType === 'letter') {
        expectedKey = 'a';
        isCorrect = (key === 'a');
    } else {
        expectedKey = 'l';
        isCorrect = (key === 'l');
    }
    
    // Only process if correct key is pressed
    if (key === 'a' || key === 'l') {
        if (isCorrect) {
            correct++;
            sumRT += rt;
            lastRTSpan.textContent = rt;
            statusDiv.innerHTML = `✅ Correct! (${rt}ms)`;
            statusDiv.style.background = '#e8f5e9';
        } else {
            statusDiv.innerHTML = `❌ Wrong! Expected ${expectedKey.toUpperCase()} (${rt}ms)`;
            statusDiv.style.background = '#ffebee';
        }
        
        trials++;
        updateDisplay();
        
        if (trials >= MAX_TRIALS) {
            showResults();
        } else {
            generateStimulus();
        }
    }
}

// Event Listeners
document.addEventListener('keydown', handleKeyPress);

// Initial message
statusDiv.innerHTML = '⚡ Press SPACE to start';
stimulusDiv.textContent = '?';
