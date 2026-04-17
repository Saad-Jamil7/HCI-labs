// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    let clickCount = 0;
    const MAX_CLICKS = 3;

    // Get elements
    const button = document.getElementById('myButton');
    const messageDiv = document.getElementById('message');
    const counterSpan = document.getElementById('counter');

    // Check if elements exist
    if (!button) console.error("Button not found!");
    if (!messageDiv) console.error("Message div not found!");
    if (!counterSpan) console.error("Counter span not found!");

    function updateDisplay() {
        counterSpan.textContent = clickCount;
        
        if (clickCount === 0) {
            messageDiv.innerHTML = "✅ Ready to click!";
            messageDiv.style.borderLeftColor = "#ff6b35";
            messageDiv.style.background = "#f0f7ff";
            messageDiv.style.color = "#333";
        } else if (clickCount === 1) {
            messageDiv.innerHTML = "✅ Processed 1 time";
            messageDiv.style.borderLeftColor = "#ff6b35";
            messageDiv.style.background = "#f0f7ff";
            messageDiv.style.color = "#333";
        } else if (clickCount === 2) {
            messageDiv.innerHTML = "⚠️ WARNING! One click left! ⚠️";
            messageDiv.style.borderLeftColor = "#ff9800";
            messageDiv.style.background = "#fff8e1";
            messageDiv.style.color = "#e65100";
        } else if (clickCount === 3) {
            messageDiv.innerHTML = "⛔ LIMIT REACHED! Refresh page to try again ⛔";
            messageDiv.style.borderLeftColor = "#dc3545";
            messageDiv.style.background = "#ffebee";
            messageDiv.style.color = "#c62828";
        }
    }

    function handleClick() {
        console.log("Button clicked! Current count:", clickCount);
        
        if (clickCount >= MAX_CLICKS) {
            console.log("Button is disabled, ignoring click");
            return;
        }
        
        clickCount++;
        console.log("New count:", clickCount);
        
        // Visual feedback
        button.style.transform = "scale(0.95)";
        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 100);
        
        updateDisplay();
        
        if (clickCount === MAX_CLICKS) {
            button.disabled = true;
            button.style.background = "#ccc";
            button.style.cursor = "not-allowed";
        }
    }

    // Add click event
    button.addEventListener('click', handleClick);
    
    // Initialize display
    updateDisplay();
    console.log("Lab 05(a) is ready! Click the orange button.");
    
});
