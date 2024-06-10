let elapsedTime = 0;
let timer = null;
let isRunning = false;
let startTime = 0;
let lapTimeslist = [];
//html elements
const hoursDiv = document.getElementById("hours");
const minutesDiv = document.getElementById("minutes");
const secondsDiv = document.getElementById("seconds");
const millisecondsDiv = document.getElementById("milliseconds");
const error = document.getElementById("error");
const lapTimes = document.getElementById("lapTimes");
function start() {
	if (!isRunning) {
		startTime = Date.now() - elapsedTime;
		timer = setInterval(update, 10);
		isRunning = true;
	} else {
		displayError("Use start button to start again!");
	}
}
function stop() {
	if (isRunning) {
		clearInterval(timer);
		elapsedTime = Date.now() - startTime;
		isRunning = false;
	} else {
		displayError("Use start button to start again!");
	}
}
function reset() {
	clearInterval(timer);
	elapsedTime = 0;
	timer = null;
	isRunning = false;
	startTime = 0;
	hoursDiv.innerHTML = "00";
	minutesDiv.innerHTML = "00";
	secondsDiv.innerHTML = "00";
	millisecondsDiv.innerHTML = "00";
	lapTimeslist = []; // Reset lap times array
	lapTimes.innerHTML = ""; // Clear lap times display
	hideError();
}
function update(time) {
	const currentTime = Date.now();
	elapsedTime = currentTime - startTime;
	let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
	let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
	let seconds = Math.floor((elapsedTime / 1000) % 60);
	let milliseconds = Math.floor((elapsedTime % 1000) / 10);
	hoursDiv.innerHTML = String(hours).padStart(2, "0");
	minutesDiv.innerHTML = String(minutes).padStart(2, "0");
	secondsDiv.innerHTML = String(seconds).padStart(2, "0");
	millisecondsDiv.innerHTML = String(milliseconds).padStart(2, "0");
}
function recordLap() {
	if (isRunning) {
		const lapTime = elapsedTime;
		lapTimeslist.push(lapTime);
		const lapIndex = lapTimeslist.length;
		const lapTimeString = formatTime(lapTime);
		const lapItem = document.createElement("li");
		lapItem.innerHTML = `<span>Lap ${lapIndex}</span><b>:</b> <span>${lapTimeString}</span>`;
		lapTimes.appendChild(lapItem);
	} else {
		displayError("Stopwatch is not running!");
	}
}

function displayError(message) {
	error.style.display = "block";
	error.innerHTML = message;
	error.style.color = "#a50e0e";
	error.style.backgroundColor = "#FCE8E6";
	setTimeout(hideError, 5000);
}

// Hide error message
function hideError() {
	error.style.display = "none";
}

function formatTime(time) {
	let hours = Math.floor(time / (1000 * 60 * 60));
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let seconds = Math.floor((time / 1000) % 60);
	let milliseconds = Math.floor((time % 1000) / 10);
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
		2,
		"0"
	)}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(
		2,
		"0"
	)}`;
}
