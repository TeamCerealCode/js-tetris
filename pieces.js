const COLORS = {
	1: "#0F9BD7", // IPiece
	2: "#2141C6", // JPiece
	3: "#E35B02", // LPiece
	4: "#E39F02", // OPiece
	5: "#59B101", // SPiece
	6: "#D70F37", // ZPiece
	7: "#AF298A", // TPiece
	8: "#c8c8c8" // Garbage blocks

}

class tetrimino {
	constructor(x, y, type = 8, size = 3) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.moveRight = false;
		this.moveLeft = false;
		this.upArrow = false;
		this.grid = [];
		this.size = size;
		for (let i = 0; i < size; i++) {
			let row = []
			for (let j = 0; j < size; j++) {
				row.push(0);
			}
			this.grid.push(row);
		}
	}

	draw() {
		push();

		noStroke();
		fill(this.color);
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.grid[i][j] != 0) {
					rect((this.x + j) * tSize + startX, (this.y + i) * tSize + startY, tSize, tSize);
				}
			}
		}

		pop();
	}

	move() {
		if (keyIsDown(LEFT_ARROW)) {
			this.moveLeft = true;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.moveRight = true;
		}
	}
	toGrid() {
		clearLines();
	}
	rotate() {
		return true
	}
	harddrop() {
		for (let y = this.y; y <= gHeight; y++) {
			if (this.collide(y)) {
				this.y = y;
				this.toGrid();
				return true
			}
		}
		return false
	}

}