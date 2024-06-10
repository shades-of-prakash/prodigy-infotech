const cells = document.querySelectorAll(".cell");
const winner = document.getElementById("winner");
const restart = document.getElementById("restart");
let gameOver = false;
let currentPlayer = "X";
const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8], // Rows
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8], // Columns
	[0, 4, 8],
	[2, 4, 6], // Diagonals
];
cells.forEach((cell) =>
	cell.addEventListener("click", (e) => {
		onCellClick(e);
	})
);
function onCellClick(e) {
	const index = e.target.dataset.index;
	const isdata = document.querySelector(`[data-index="${index}"]`);
	const dataAll = document.querySelectorAll("[data-index]");
	if (isdata.textContent || gameOver) return;
	isdata.textContent = currentPlayer;
	if (checkWinner()) {
		winner.style.display = "block";
		winner.textContent = `${currentPlayer} wins!`;
		gameOver = true;
	} else if (Array.from(dataAll).every((cell) => cell.textContent)) {
		winner.style.display = "block";
		winner.textContent = "It's a draw!";
		gameOver = true;
	} else {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		if (currentPlayer === "O") {
			setTimeout(() => {
				computerPlay;
				document.getElementById("turn").textContent = "Player";
			}, 1000);
			document.getElementById("turn").textContent = "Computer";
		} else {
			document.getElementById("turn").textContent = "Player";
		}
	}
}
function checkWinner() {
	// Check if any winning combination is achieved by the current player
	return winningCombinations.some((combination) => {
		return combination.every((index) => {
			const isdata = document.querySelector(`[data-index="${index}"]`);
			return isdata.textContent === currentPlayer;
		});
	});
}

function computerPlay() {
	const dataAll = document.querySelectorAll("[data-index]");
	const emptyCells = Array.from(dataAll)
		.filter((cell) => !cell.textContent)
		.map((cell) => cell.dataset.index);
	console.log(emptyCells);
	if (emptyCells.length === 0) return;
	const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
	console.log(randomIndex);
	const cell = document.querySelector(`[data-index="${randomIndex}"]`);
	console.log(cell);
	cell.textContent = currentPlayer;

	if (checkWinner()) {
		winner.style.display = "block";
		winner.textContent = `${currentPlayer} wins!`;
		gameOver = true;
	} else if (Array.from(dataAll).every((cell) => cell.textContent)) {
		winner.style.display = "block";
		winner.textContent = "It's a draw!";
		gameOver = true;
	} else {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
	}
}
restart.addEventListener("click", () => {
	currentPlayer = "X";
	gameOver = false; // Reset gameOver
	winner.textContent = "";
	cells.forEach((cell) => {
		cell.textContent = "";
	});
});
