let delay = ms =>
	new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve();
		}, ms);
	});

function Sudoku(root, url, speed = 50) {
	this.board = [];
	this.boardSize = 4;
	this.emptyCells = [];
	this.speed = speed;
	this.generate(root, url);
}

Sudoku.prototype.changeSpeed = function(value) {
	this.speed = value;
};

Sudoku.prototype.createCell = function(x, y, value) {
	let cell = document.createElement("td");
	let input = document.createElement("input");
	input.setAttribute("data-x", x);
	input.setAttribute("data-y", y);
	input.classList.add("cell");
	input.type = "text";
	if (value !== 0) {
		input.disabled = true;
		input.value = value;
		input.style.fontWeight = 600;
	} else {
		cell.style.background = "#fff";
		input.style.background = "#fff";
	}
	cell.id = `cell-${x}-${y}`;
	cell.appendChild(input);
	return cell;
};

Sudoku.prototype.generateBoard = function() {
	let table = document.createElement("table");
	table.id = `b${this.boardSize}`;
	table.classList.add("sudoku");
	table.setAttribute("border", "1");
	table.setAttribute("style", "border-collapse: collapse;");

	let tbody = document.createElement("tbody");
	table.appendChild(tbody);
	for (let i = 0; i < this.boardSize; ++i) {
		let row = document.createElement("tr");
		row.classList.add("row");

		for (let j = 0; j < this.boardSize; ++j) {
			if (this.board[i][j] === 0) {
				this.emptyCells.push({ x: i, y: j });
			}
			row.appendChild(sudoku.createCell(i, j, this.board[i][j]));
		}

		tbody.appendChild(row);
	}
	root.appendChild(table);
};

Sudoku.prototype.changeCellValue = function(x, y, value) {
	if (!value) {
		value = 0;
	} else {
		value = parseInt(value, 10);
	}
	//TODO: validate value
	this.board[x][y] = value;
};

Sudoku.prototype.generate = function(root, url) {
	root.innerHTML = "";
	fetch(url)
		.then(res => res.json())
		.then(({ board }) => {
			this.board = board.map(ar => [...ar]);
			this.boardSize = this.board.length;
			this.generateBoard();
		})
		.catch(err => console.log(err));
};

Sudoku.prototype.checkCells = async function() {
	for (let i = 0; i < this.emptyCells.length; ++i) {
		let { x, y } = this.emptyCells[i];
		if (this.board[x][y] === 0) continue;
		if (!this.isCorrect(x, y)) {
			let cell = document.querySelector(`#cell-${x}-${y}`);
			cell.style.background = "red";
			await delay(800);
			cell.style.background = "#fff";
			break;
		}
	}
};

Sudoku.prototype.checkRow = function(x, y) {
	for (let i = 0; i < this.boardSize; ++i) {
		if (i === x || this.board[i][y] === 0) continue;
		if (this.board[i][y] === this.board[x][y]) return false;
	}
	return true;
};

Sudoku.prototype.checkCol = function(x, y) {
	for (let i = 0; i < this.boardSize; ++i) {
		if (i === y || this.board[x][i] === 0) continue;
		if (this.board[x][i] === this.board[x][y]) return false;
	}
	return true;
};

Sudoku.prototype.checkBox = function(x, y) {
	let div = Math.sqrt(this.boardSize);
	let inx = Math.floor(x / div) * div;
	let iny = Math.floor(y / div) * div;
	for (let i = inx; i < inx + div; ++i) {
		for (let j = iny; j < iny + div; ++j) {
			if (i === x && j === y) continue;
			if (this.board[i][j] === 0) continue;
			if (this.board[i][j] === this.board[x][y]) return false;
		}
	}
	return true;
};

Sudoku.prototype.isCorrect = function(x, y) {
	return (
		this.checkRow(x, y) &&
		this.checkCol(x, y) &&
		this.checkBox(x, y) &&
		this.board[x][y] !== 0
	);
};

Sudoku.prototype.getNextEmptyCell = function() {
	for (let i = 0; i < this.boardSize; ++i) {
		for (let j = 0; j < this.boardSize; ++j) {
			if (this.board[i][j] === 0) {
				return { x: i, y: j };
			}
		}
	}
	return { x: this.boardSize, y: this.boardSize };
};

Sudoku.prototype.solve = async function() {
	let { x, y } = this.getNextEmptyCell();

	if (x === this.boardSize && y === this.boardSize) {
		return true;
	}

	let inputCell = document
		.querySelector(`#cell-${x}-${y}`)
		.querySelector("input");

	for (let i = 1; i <= this.boardSize; ++i) {
		this.board[x][y] = i;

		if (!this.isCorrect(x, y)) {
			continue;
		}

		if (this.speed !== 0) {
			await delay(this.speed);
		}

		inputCell.value = i;
		inputCell.style.color = "green";

		let result = await this.solve();
		if (result) {
			return true;
		}
	}
	this.board[x][y] = 0;
	inputCell.value = "";

	return false;
};

// let sudoku = new Sudoku(root);
