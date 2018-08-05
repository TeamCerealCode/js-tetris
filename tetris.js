var block;
var grid;
const gWidth = 10; // grid width
const gHeight = 22; // grid height
const tSize = 20; // tile size
var startX;
var startY;
let debugMode = false;

function setup() {
	createCanvas(500, 500);
	block = new OBlock(3, 0);
	startX = (width / 2) - (gWidth * tSize / 2);
	startY = (height / 2) - (gHeight * tSize / 2);

	grid = [];
	for (let i = 0; i < gWidth; i++) {
		var column = [];
		for (let j = 0; j < gHeight; j++) {
			column.push(0);
		}
		grid.push(column);
	}
}

function draw() {
	background(0);
	drawGrid();
	block.draw();
	if (block.update() == false) {
		block = new OBlock(3, 0);
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
	for (let i = 0; i < gWidth; i++) {
		for (let j = 0; j < gHeight; j++) {
			var type = grid[i][j];
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
		let row = grid.map(x => x[i]);
		if (row.every(x => x != 0)) {
			movedown(i);
		}
	}
}

function movedown(h) {
	for (let i = h - 1; i >= 0; i--) {
		for (let j = 0; j < gWidth; j++) {
			grid[j][i + 1] = grid[j][i];
		}
	}
}

function debugMouse() {
	if (mouseIsPressed) {
		var gMouseX = int((mouseX - startX) / tSize);
		var gMouseY = int((mouseY - startY) / tSize);
		if (gMouseX < 0 || gMouseX > gWidth - 1 || gMouseY < 0 || gMouseY > gHeight - 1)
			return
		grid[gMouseX][gMouseY] = 8;
	}
}