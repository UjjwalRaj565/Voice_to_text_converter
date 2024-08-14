// Select elements from the DOM
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const textOutput = document.getElementById('text-output');
const statusText = document.getElementById('status');

let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    // Initialize the Web Speech API
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Event listener for when speech recognition produces a result
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        textOutput.value += transcript + ' ';
        statusText.textContent = "Keep speaking... Press 'Stop Recording' when you're done.";
    };

    // Event listener for when speech recognition ends
    recognition.onend = function() {
        statusText.textContent = "Recording stopped. Press 'Start Recording' to continue or finish your session.";
        startBtn.textContent = 'Start Recording';
        startBtn.classList.remove('recording');
        stopBtn.disabled = true;
        startBtn.disabled = false;
    };

    // Event listener for errors
    recognition.onerror = function(event) {
        statusText.textContent = "Error occurred in speech recognition: " + event.error;
        startBtn.textContent = 'Start Recording';
        startBtn.classList.remove('recording');
        stopBtn.disabled = true;
        startBtn.disabled = false;
    };
} else {
    alert('Speech Recognition API not supported in this browser.');
    startBtn.disabled = true;
    stopBtn.disabled = true;
}

// Start recording
startBtn.addEventListener('click', () => {
    recognition.start();
    statusText.textContent = "Recording... Speak now.";
    startBtn.textContent = 'Recording...';
    startBtn.classList.add('recording');
    stopBtn.disabled = false;
    startBtn.disabled = true;
});

// Stop recording
stopBtn.addEventListener('click', () => {
    recognition.stop();
    statusText.textContent = "Processing your input...";
});
