let delay = ms =>
	new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve();
		}, ms);
	});

const root = document.getElementById("root");
const generateBtn = document.querySelector("#generate");
const checkBtn = document.querySelector("#check");
const solveBtn = document.querySelector("#solve");
const speedRange = document.querySelector("#range");

let sudoku = new Sudoku(root);
let speed = 40;

root.addEventListener("input", function(event) {
	let value = event.data;
	console.log(event);
	let { x, y } = event.target.dataset;
	sudoku.changeCellValue(x, y, value);
});

generateBtn.addEventListener("click", function(event) {
	event.preventDefault();
	solveBtn.disabled = true;
	checkBtn.disabled = true;

	sudoku = new Sudoku(root, speed);

	solveBtn.disabled = false;
	checkBtn.disabled = false;
});

// checkBtn.addEventListener("click", function() {
// 	sudoku.check();
// });

solveBtn.addEventListener("click", async function() {
	generateBtn.disabled = true;
	checkBtn.disabled = true;
	speedRange.disabled = true;

	await sudoku.solve();

	generateBtn.disabled = false;
	checkBtn.disabled = false;
	speedRange.disabled = false;
});

speedRange.addEventListener("change", function(event) {
	speed = event.target.value;
});

//   let board = new Array(boardSize);
//   for (let i = 0; i < boardSize; ++i) {
//     board[i] = new Array(boardSize);
//     board[i].fill(0);
//   }

//   response.forEach(({ x, y, value }) => (board[x][y] = value));
//   for (let i = 0; i < boardSize; ++i) {
//     for (let j = 0; j < boardSize; ++j) {
//         process.stdout.write(board[i][j] + " ");
//     }
//     process.stdout.write("\n");
//   }
