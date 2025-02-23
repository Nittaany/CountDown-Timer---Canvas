// script.js
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timerDisplay");
const endMessage = document.getElementById("endMessage");
const canvas = document.getElementById("fancyCanvas");
const ctx = canvas.getContext("2d");

let countdownInterval;
let totalTime;
let hours, minutes, seconds;
let radius = 50;

function startCountdown() {
    hours = parseInt(document.getElementById("hoursInput").value) || 0;
    minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    seconds = parseInt(document.getElementById("secondsInput").value) || 0;

    totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime <= 0) return;  // If no time is entered, do nothing.

    clearInterval(countdownInterval); // Clear any existing intervals

    // Start the countdown
    countdownInterval = setInterval(() => {
        if (totalTime <= 0) {
            // Draw canvas at time 0
            drawCanvas(0);
            // Update display to show 00:00:00
            timerDisplay.textContent = "00:00:00";
            clearInterval(countdownInterval); // Stop the countdown
            showEndMessage(); // Show "Time's Up!"
            return;  // Stop execution when the time is up
        }

        // Calculate hours, minutes, and seconds
        const hrs = Math.floor(totalTime / 3600);
        const mins = Math.floor((totalTime % 3600) / 60);
        const secs = totalTime % 60;

        // Update the timer display
        timerDisplay.textContent = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

        // Draw the canvas circle animation
        drawCanvas(totalTime);

        totalTime--;  // Decrement time every second
    }, 1000);
}

function drawCanvas(time) {
    // Calculate the percentage of remaining time
    const percentage = time / (hours * 3600 + minutes * 60 + seconds);

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circular progress bar
    ctx.beginPath();
    ctx.arc(125, 125, radius, -0.5 * Math.PI, (2 * Math.PI * percentage) - 0.5 * Math.PI, false);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#8e24aa'; // Circle color
    ctx.stroke();

    // Add a center circle to make the circle look nice
    ctx.beginPath();
    ctx.arc(125, 125, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
}

function showEndMessage() {
    endMessage.classList.remove("hidden");
    endMessage.style.opacity = "1";
    setTimeout(() => {
        endMessage.style.opacity = "0";
        endMessage.classList.add("hidden");
    }, 3000);  // Display "Time's Up!" for 3 seconds
}

startButton.addEventListener("click", startCountdown);
