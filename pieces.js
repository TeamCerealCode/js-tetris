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
		this.color = COLORS[this.type];
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
		var reverse = false;
		var inc = -1; // increment
		var sX = 0;
		if (keyIsDown(RIGHT_ARROW)) {
			reverse = true;
			inc = 1;
			sX = this.size - 1;
		}

		if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
			let y = 0;
			for (let row_ of this.grid) {
				let x = sX;
				let row = reverse ? row_.slice().reverse() : row_;
				for (let g of row) {
					if (g != 0) {
						if (grid[this.y + y][this.x + x + inc] == 0) {
							break
						} else {
							return
						}
					}
					x += inc * -1;
				}
				y++;
			}
			this.x += inc;
		}
	}
	toGrid() {
		for (let j = 0; j < this.size; j++) {
			for (let i = 0; i < this.size; i++) {
				if (this.grid[j][i] != 0) {
					grid[this.y + j][this.x + i] = this.type;
				}
			}
		}
		clearLines();
	}

	collide(yOff = this.y) {
		let y = 0;
		for (let row of this.grid) {
			let x = 0;
			for (let g of row) {
				if (g != 0) {
					if (yOff + y + 1 >= gHeight || grid[yOff + y + 1][this.x + x] != 0) {
						return true
					}
				}
				x++;
			}
			y++;
		}
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