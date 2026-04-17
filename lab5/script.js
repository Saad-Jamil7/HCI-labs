let clickCount = 0;
const MAX_CLICKS = 3;

const button = document.getElementById('myButton');
const messageDiv = document.getElementById('message');
const counterSpan = document.getElementById('counter');

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
    if (clickCount >= MAX_CLICKS) return;
    
    clickCount++;
    
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

button.addEventListener('click', handleClick);
updateDisplay();
console.log("Lab 05(a) is ready!");
