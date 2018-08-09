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
		for (let i = 0; i < this.size; i++) {
			let row = []
			for (let j = 0; j < this.size; j++) {
				row.push(0);
			}
			this.grid.push(row);
		}
		this.dasLeft = 0;
		this.dasRight = 0;
		this.das = 10;
		this.slideTimer = 0;
		this.fall = true;
	}

	update() {
		if (keyIsDown(LEFT_ARROW))
			this.dasLeft++;
		else
			this.dasLeft = 0
		if (keyIsDown(RIGHT_ARROW))
			this.dasRight++;
		else
			this.dasRight = 0
		if (this.dasRight == 1 || this.dasLeft == 1 || this.dasRight > this.das || this.dasLeft > this.das)
			this.move();
		if (upArrow) {
			upArrow = false;
			return !this.harddrop();
		}
		if (!frozen) {
			if (this.collide()) {
				this.slideTimer++;
				this.fall = false;
			} else {
				this.fall = !(this.slideTimer > 0);
			}
			if (this.slideTimer > 60) {
				this.toGrid();
				return false
			}
		}
		if (!frozen && this.fall && frameCount != 0 && frameCount % (keyIsDown(DOWN_ARROW) ? 5 : 30) == 0) {
			this.y++;
		}
		return true
	}

	draw(out = false, x, y) {
		push();

		noStroke();
		fill(this.color);
		for (let j = 0; j < this.size; j++) {
			for (let i = 0; i < this.size; i++) {
				if (this.grid[j][i] != 0) {
					if (out) {
						rect(x + (i * tSize), y + (j * tSize), tSize, tSize);
					} else {
						rect((this.x + i) * tSize + startX, (this.y + j) * tSize + startY, tSize, tSize);
					}
				}
			}
		}

		pop();
	}

	move() {
		var reverse = false;
		var inc = -1;
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
							return false
						}
					}
					x += inc * -1;
				}
				y++;
			}
			this.x += inc;
			this.slideTimer = 0;
			return true
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
		pieceDropped();
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
		return false
	}


	rotate(cw = true) {
		var newGrid = [];
		for (let i = 0; i < this.size; i++) {
			let row = []
			for (let j = 0; j < this.size; j++) {
				row.push(0);
			}
			newGrid.push(row);
		}
		for (let y = 0; y < this.size; y++) {
			for (let x = 0; x < this.size; x++) {
				let newX;
				let newY;
				if (cw) {
					newX = this.size - y - 1;
					newY = x;
				} else {
					newX = y;
					newY = this.size - x - 1;
				}
				newGrid[newY][newX] = this.grid[y][x];
			}
		}
		this.grid = newGrid

		this.slideTimer = 0;
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