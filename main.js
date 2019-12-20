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

let sudoku = new Sudoku(root);

root.addEventListener("input", function(event) {
	let value = event.data;
	console.log(event);
	let { x, y } = event.target.dataset;
	sudoku.changeCellValue(x, y, value);
});

generateBtn.addEventListener("click", function(event) {
	event.preventDefault();
	sudoku = new Sudoku(root);
});

// checkBtn.addEventListener("click", function() {
// 	sudoku.check();
// });

solveBtn.addEventListener("click", async function() {
	// console.log(array);
	await sudoku.solve();
	// console.log(sudoku.board);
});

// sudoku.generate(root);

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
