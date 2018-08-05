const COLORS = {
	1: "#0F9BD7", // IPiece
	2: "#2141C6", // JPiece
	3: "#E35B02", // LPiece
	4: "#E39F02", // OPiece
	5: "#59B101", // SPiece
	6: "#D70F37", // ZPiece
	7: "#AF298A", // TPiece
	8: "#c8c8c8"  // Garbage blocks

}

class tetrimino {
	constructor(x, y, type = 8) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.moveRight = false;
		this.moveLeft = false;
	}

}

class OBlock extends tetrimino {
	constructor(x, y) {
		super(x, y, 7);
		this.color = COLORS[this.type];
	}
	draw() {
		push();

		noStroke();
		fill(this.color);
		rect(this.x * tSize + startX, this.y * tSize + startY, tSize * 2, tSize * 2);

		pop();
	}
	update() {
		this.move();
		if (this.y + 2 >= gHeight) {
			this.toGrid();
			return false
		}
		if (grid[this.x][this.y + 2] != 0 || grid[this.x + 1][this.y + 2] != 0) {
			this.toGrid();
			return false
		}
		if (frameCount != 0 && frameCount % (keyIsDown(DOWN_ARROW) ? 5 : 30) == 0) {
			this.y++;
		}
		return true
	}
	move() {
		if (keyIsDown(LEFT_ARROW)) {
			this.moveLeft = true;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.moveRight = true;
		}

		if (frameCount % 7 == 0) {
			if (this.moveLeft) {
				this.moveLeft = false;
				if (this.x != 0) {
					if (grid[this.x - 1][this.y] == 0 && grid[this.x - 1][this.y + 1] == 0)
						this.x--;
				}
			}
			if (this.moveRight) {
				this.moveRight = false;
				if (this.x != gWidth - 2) {
					if (grid[this.x + 2][this.y] == 0 && grid[this.x + 2][this.y + 1] == 0)
						this.x++;
				}
			}
		}

	}

	toGrid() {
		grid[this.x][this.y] = this.type;
		grid[this.x + 1][this.y] = this.type;
		grid[this.x][this.y + 1] = this.type;
		grid[this.x + 1][this.y + 1] = this.type;
	}
}