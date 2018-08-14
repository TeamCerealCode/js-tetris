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
		this.dasTimer = 2;
		this.slideTimer = 0;
		this.fall = true;
		this.rotState = 0;
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
		if (this.dasRight == 1 || this.dasLeft == 1)
			this.move();

		if (this.dasRight > this.das || this.dasLeft > this.das) {
			for (let i = 0; i < this.dasTimer; i++)
				this.move();
		}
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

	drawShadow() {
		push();

		noStroke();
		fill(this.color+"80");
		let yOff = this.harddrop(false);
		for (let j = 0; j < this.size; j++) {
			for (let i = 0; i < this.size; i++) {
				if (this.grid[j][i] != 0) {
					rect((this.x + i) * tSize + startX, (yOff + j) * tSize + startY, tSize, tSize);
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

	isInside(g = this.grid, xOff, yOff) {
		xOff += this.x;
		yOff += this.y;
		for (let y = 0; y < this.size; y++) {
			for (let x = 0; x < this.size; x++) {
				if (g[y][x] != 0) {
					if (xOff + x < 0 || xOff + x > gWidth || yOff + y >= gHeight) {
						return true
					}
					if (grid[yOff + y][xOff + x] != 0) {
						return true
					}
				}
			}
		}
		return false
	}

	rotate(cw = true) {
		if (this.type == 4)
			return true
		var newGrid = [];
		for (let i = 0; i < this.size; i++) {
			let row = []
			for (let j = 0; j < this.size; j++) {
				row.push(0);
			}
			newGrid.push(row);
		}

		var rotS = () => this.rotState < 0 ? 3 : this.rotState % 4;
		var prevRot = this.rotState;
		if (cw) {
			this.rotState++;
			this.rotState = rotS();
		} else {
			this.rotState--;
			this.rotState = rotS();
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



		/*
		0 - default
		1 - R (clockwise)
		2 - 2 (180 rot)
		3 - L (c-clockwise)
		*/

		// passed all 5 tests
		var passed = false;
		// we want to know the offset outside of the for loop
		var off;

		for (let test = 0; test < 5; test++) {
			var j = int(lookup[prevRot].charAt(this.rotState));;
			if (this.type == 1)
				off = wallkickI[test][j];
			else
				off = wallkick[test][j];
			if (!this.isInside(newGrid, off[0], off[1])) {
				passed = true;
				break;
			}
		}


		if (passed) {
			this.grid = newGrid;
			this.x += off[0];
			this.y += off[1];
			this.slideTimer = 0;
		} else {
			this.rotState = prevRot;
		}

		return passed;
	}
	harddrop(set = true) {
		for (let y = this.y; y <= gHeight; y++) {
			if (this.collide(y)) {
				if (set) {
					this.y = y;
					this.toGrid();
				}
				return y
			}
		}
	}

}