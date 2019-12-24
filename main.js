const root = document.getElementById("root");
const generateBtn = document.querySelector("#generate");
const checkBtn = document.querySelector("#check");
const solveBtn = document.querySelector("#solve");
const speedRange = document.querySelector("#range");
const diffMenu = document.querySelector("#diff-menu");
const diffTip = document.querySelector("#diff-tip");

const URL = `https://sugoku.herokuapp.com/board?difficulty=`;

let difficuly = "easy";
let speed = 50;
let sudoku = new Sudoku(root, `${URL}${difficuly}`, speed);

root.addEventListener("input", function(event) {
	let value = event.data;
	// console.log(event);
	let { x, y } = event.target.dataset;
	sudoku.changeCellValue(x, y, value);
});

generateBtn.addEventListener("click", function(event) {
	event.preventDefault();
	solveBtn.disabled = true;
	checkBtn.disabled = true;

	sudoku = new Sudoku(root, `${URL}${difficuly}`, speed);

	solveBtn.disabled = false;
	checkBtn.disabled = false;
});

checkBtn.addEventListener("click", function() {
	sudoku.checkCells();
});

solveBtn.addEventListener("click", async function() {
	generateBtn.disabled = true;
	checkBtn.disabled = true;
	speedRange.disabled = true;
	solveBtn.disabled = true;

	// console.log("sudo speed ", sudoku.speed);
	await sudoku.solve();

	let cells = root.querySelectorAll("input");
	cells.forEach(c => (c.style.color = "#000"));

	generateBtn.disabled = false;
	checkBtn.disabled = false;
	speedRange.disabled = false;
});

speedRange.addEventListener("change", function(event) {
	speed = parseInt(event.target.value, 10);
	sudoku.changeSpeed(speed);
	// console.log(speed);
});

diffMenu.addEventListener("click", function(event) {
	let value = event.target.text;
	diffTip.innerText = value;
	difficuly = value.toLowerCase();
});
