// Lab 05(a) - Simple Interactive Button
// All JavaScript is here - fully working!

let clickCount = 0;
const MAX_CLICKS = 3;

// Get elements
const button = document.getElementById('myButton');
const messageDiv = document.getElementById('message');
const counterSpan = document.getElementById('counter');

// Function to update everything
function updateDisplay() {
    // Update counter display
    counterSpan.textContent = clickCount;
    
    // Update message based on clicks
    if (clickCount === 0) {
        messageDiv.innerHTML = "✅ Ready to click!";
        messageDiv.style.borderLeftColor = "#ff6b35";
    } else if (clickCount === 1) {
        messageDiv.innerHTML = "✅ Processed 1 time";
        messageDiv.style.borderLeftColor = "#ff6b35";
    } else if (clickCount === 2) {
        messageDiv.innerHTML = "⚠️ WARNING! One click left! ⚠️";
        messageDiv.style.borderLeftColor = "#ff9800";
        messageDiv.style.background = "#fff8e1";
    } else if (clickCount === 3) {
        messageDiv.innerHTML = "⛔ LIMIT REACHED! Reload to try again ⛔";
        messageDiv.style.borderLeftColor = "#dc3545";
        messageDiv.style.background = "#ffebee";
        messageDiv.style.color = "#c62828";
    }
}

// Button click handler
function handleClick() {
    if (clickCount >= MAX_CLICKS) {
        // Button is disabled, can't click
        return;
    }
    
    // Increment count
    clickCount++;
    
    // Give visual feedback (button shrink effect)
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 100);
    
    // Update display
    updateDisplay();
    
    // If reached max, disable button
    if (clickCount === MAX_CLICKS) {
        button.disabled = true;
        button.style.background = "#ccc";
        button.style.cursor = "not-allowed";
    }
}

// Add event listener
button.addEventListener('click', handleClick);

// Initial display
updateDisplay();
console.log("Lab 05(a) is ready! Click the button.");
