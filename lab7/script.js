// ============================================
// LAB 07: Keyboard Reaction Time Test
// Simple version - Easy to understand and explain
// ============================================

// ---------- VARIABLES (Easy to understand names) ----------
let trialNumber = 0;        // How many trials done (0 to 10)
let correctAnswers = 0;     // How many correct answers
let totalReactionTime = 0;  // Sum of all reaction times

let currentItem = '';       // What is shown on screen (like 'K' or '5')
let itemType = '';          // Is it 'letter' or 'number'
let timeWhenShown = 0;      // When did the item appear on screen
let testRunning = false;    // Is test active or not?

const TOTAL_TRIALS = 10;    // We will do 10 trials

// ---------- Get all HTML elements ----------
const bigBox = document.getElementById('stimulus');     // Big box showing letter/number
const trialSpan = document.getElementById('trial');     // Shows trial number
const correctSpan = document.getElementById('correct'); // Shows correct count
const lastRTSpan = document.getElementById('lastRT');   // Shows last reaction time
const avgRTSpan = document.getElementById('avgRT');     // Shows average reaction time
const messageBox = document.getElementById('message');   // Shows status messages

// ---------- FUNCTION 1: Get random LETTER (A to Z) ----------
function getRandomLetter() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomIndex = Math.floor(Math.random() * 26);  // Random number 0 to 25
    return letters[randomIndex];
}

// ---------- FUNCTION 2: Get random NUMBER (0 to 9) ----------
function getRandomNumber() {
    return Math.floor(Math.random() * 10);  // Random number 0 to 9
}

// ---------- FUNCTION 3: Show new letter or number on screen ----------
function showNewItem() {
    // 50% chance letter, 50% chance number
    let isLetter = Math.random() < 0.5;
    
    if (isLetter) {
        currentItem = getRandomLetter();
        itemType = 'letter';
    } else {
        currentItem = getRandomNumber();
        itemType = 'number';
    }
    
    // Display it on screen
    bigBox.textContent = currentItem;
    
    // Record the time when item appeared (for reaction time calculation)
    timeWhenShown = Date.now();
    
    // Update message
    messageBox.innerHTML = '⏱️ Waiting for your response...';
    messageBox.style.background = '#fff3e0';
}

// ---------- FUNCTION 4: Update all numbers on screen ----------
function updateScreen() {
    trialSpan.textContent = trialNumber;
    correctSpan.textContent = correctAnswers;
    
    // Calculate average reaction time (only if at least 1 correct)
    if (correctAnswers > 0) {
        let average = totalReactionTime / correctAnswers;
        avgRTSpan.textContent = Math.round(average);
    }
}

// ---------- FUNCTION 5: Show final result when test ends ----------
function showFinalResult() {
    testRunning = false;
    
    // Calculate accuracy percentage
    let accuracy = (correctAnswers / TOTAL_TRIALS) * 100;
    let averageRT = totalReactionTime / correctAnswers;
    
    // Change big box to green checkmark
    bigBox.textContent = '✓';
    bigBox.style.background = '#28a745';
    
    // Show final message
    messageBox.innerHTML = '🎉 TEST COMPLETE! 🎉<br>' +
        'Accuracy: ' + accuracy + '% | Average RT: ' + Math.round(averageRT) + ' ms<br>' +
        'Press SPACE to try again';
    messageBox.style.background = '#e8f5e9';
}

// ---------- FUNCTION 6: Start the test (reset everything) ----------
function startTest() {
    // Reset all variables
    trialNumber = 0;
    correctAnswers = 0;
    totalReactionTime = 0;
    testRunning = true;
    
    // Reset visual style
    bigBox.style.background = '#667eea';
    messageBox.innerHTML = '⚡ Test started! Press A (Letter) or L (Number)';
    messageBox.style.background = '#e8f4f8';
    lastRTSpan.textContent = '—';
    avgRTSpan.textContent = '—';
    
    // Show first item
    showNewItem();
    updateScreen();
}

// ---------- FUNCTION 7: Main logic - What happens when you press a key ----------
function checkKeyPress(event) {
    let keyPressed = event.key.toLowerCase();  // Convert to lowercase (A becomes a)
    
    // If test is not running, check if SPACE is pressed to start
    if (!testRunning) {
        if (keyPressed === ' ' || keyPressed === 'space') {
            startTest();
        }
        return;
    }
    
    // Only do something if user pressed A or L
    if (keyPressed === 'a' || keyPressed === 'l') {
        
        // Calculate reaction time = current time - time when item appeared
        let reactionTime = Date.now() - timeWhenShown;
        
        let isAnswerCorrect = false;
        let expectedKey = '';
        
        // Check if answer is correct
        if (itemType === 'letter') {
            expectedKey = 'a';
            isAnswerCorrect = (keyPressed === 'a');
        } else {
            expectedKey = 'l';
            isAnswerCorrect = (keyPressed === 'l');
        }
        
        // Process the answer
        if (isAnswerCorrect) {
            correctAnswers++;
            totalReactionTime = totalReactionTime + reactionTime;
            lastRTSpan.textContent = reactionTime;
            messageBox.innerHTML = '✅ CORRECT! (' + reactionTime + ' ms)';
            messageBox.style.background = '#e8f5e9';
        } else {
            messageBox.innerHTML = '❌ WRONG! Expected ' + expectedKey.toUpperCase() + ' (' + reactionTime + ' ms)';
            messageBox.style.background = '#ffebee';
        }
        
        // Increase trial number
        trialNumber++;
        
        // Update screen
        updateScreen();
        
        // Check if test is finished
        if (trialNumber >= TOTAL_TRIALS) {
            showFinalResult();
        } else {
            // Show next item
            showNewItem();
        }
    }
}

// ---------- STEP 8: Listen for key presses ----------
document.addEventListener('keydown', checkKeyPress);

// ---------- STEP 9: Initial message when page loads ----------
messageBox.innerHTML = 'Press SPACE to start';
bigBox.textContent = '?';
