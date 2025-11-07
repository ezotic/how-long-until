const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");
const dateInput = document.getElementById('date');

function getMinDateString() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add one day
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

dateInput.min = getMinDateString();

let intervalId;
let networkTimeOnLoad;
let localTimeOnLoad;

daysEl.innerHTML = "-";
hoursEl.innerHTML = "-";
minsEl.innerHTML = "-";
secondsEl.innerHTML = "-";

// Fetch initial time from a time server
async function initializeTime() {
    try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        networkTimeOnLoad = new Date(data.utc_datetime);
        localTimeOnLoad = new Date();
    } catch (error) {
        console.error('Failed to fetch network time, falling back to local time.', error);
        // Fallback to local time if API fails
        networkTimeOnLoad = new Date();
        localTimeOnLoad = new Date();
    }
}

function countdown(targetDate) {
    const parts = targetDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const newYearDate = new Date(year, month, day);

    // Calculate current time based on initial network time + elapsed local time
    const now = new Date();
    const elapsed = now - localTimeOnLoad;
    const currentDate = new Date(networkTimeOnLoad.getTime() + elapsed);

    const totalSeconds = (newYearDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

dateInput.addEventListener('change', (e) => {
  const targetDate = e.target.value;
  if (intervalId) {
    clearInterval(intervalId);
  }
  
  const startCountdown = () => {
    countdown(targetDate);
    intervalId = setInterval(() => countdown(targetDate), 1000);
  };

  if (!networkTimeOnLoad) {
      initializeTime().then(startCountdown);
  } else {
      startCountdown();
  }
});

// Initialize time when the script loads
initializeTime();