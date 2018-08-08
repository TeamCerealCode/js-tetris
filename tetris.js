var block;
var grid;
const gWidth = 10; // grid width
const gHeight = 22; // grid height
const tSize = 20; // tile size
var startX;
var startY;

var hold = 0;
let debugMode = false;
let frozen = debugMode;
let debugColor = 8;
let upArrow = false;

function newPiece(t = 0) {
	var piece;
	if (t == 0) {
		piece = getPiece(floor(random(1,8)));
	} else {
		piece = getPiece(t);
	}
	block = new piece(int(gWidth / 2) - 2, 0);
}

function setup() {
	createCanvas(500, 500);
	newPiece();
	startX = (width / 2) - (gWidth * tSize / 2);
	startY = (height / 2) - (gHeight * tSize / 2);

	grid = [];
	for (let j = 0; j < gHeight; j++) {
		var row = [];
		for (let i = 0; i < gWidth; i++) {
			row.push(0);
		}
		grid.push(row);
	}
}

function draw() {
	background(0);
	drawGrid();
	block.draw();
	if (block.update() == false) {
		newPiece();
	}
}

function keyPressed() {
	if (keyCode == 188)
		debugMode = !debugMode;
	if (keyCode == 190)
		frozen = !frozen;
	if (keyCode == UP_ARROW)
		upArrow = true;
	if (keyCode == 88)
		block.rotate();
	if (keyCode == 32) {
		var t = block.type;
		if (hold != 0) 
			newPiece(hold);
		else
			newPiece();
		hold = t;
	}
}

function drawGrid() {
	noFill();
	stroke(50);
	for (let i = 1; i < gWidth; i++) {
		line(i * tSize + startX, startY, i * tSize + startX, startY + gHeight * tSize);
	}
	for (let i = 1; i < gHeight; i++) {
		line(startX, i * tSize + startY, startX + gWidth * tSize, i * tSize + startY);
	}

	noStroke();
	fill(200);
	for (let j = 0; j < gHeight; j++) {
		for (let i = 0; i < gWidth; i++) {
			var type = grid[j][i];
			if (type != 0) {
				fill(COLORS[type]);
				rect(i * tSize + startX, j * tSize + startY, tSize, tSize);
			}
		}
	}

	noFill();
	stroke(150);
	rect(startX, startY, gWidth * tSize, gHeight * tSize);

	if (debugMode) {
		debugMouse();
	}
}

function clearLines() {
	for (let i = 0; i < gHeight; i++) {
		let row = grid[i];
		if (row.every(x => x != 0)) {
			movedown(i);
		}
	}
}

function movedown(h) {
	for (let i = h - 1; i > 0; i--) {
		grid[i + 1] = grid[i].slice();
	}
	for (let j = 0; j < gWidth; j++) {
		grid[0][j] = 0;
	}
}

function debugMouse() {
	noStroke();
	let y = 5;
	let s = 50;
	for (let col in COLORS) {
		fill(COLORS[col]);
		rect(5, y, s, s);
		y += s + 5;
	}
	noFill();
	stroke(255, 0, 0);
	rect(5, y, s, s);

	if (mouseIsPressed) {
		y = 5;
		let len = Object.keys(COLORS).length;
		for (let i = 1; i <= len + 1; i++) {
			if (mouseX > 5 && mouseX < s + 5 && mouseY > y && mouseY < y + s) {
				debugColor = i
				return
			}
			y += s + 5;
		}
		debugColor %= len + 1

		var gMouseX = int((mouseX - startX) / tSize);
		var gMouseY = int((mouseY - startY) / tSize);
		if (gMouseX < 0 || gMouseX > gWidth - 1 || gMouseY < 0 || gMouseY > gHeight - 1)
			return
		grid[gMouseY][gMouseX] = debugColor;
	}
}