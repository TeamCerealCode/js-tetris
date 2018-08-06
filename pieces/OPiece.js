class OPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 4, 2);
		this.color = COLORS[this.type];
		this.grid[0] = [1, 1];
		this.grid[1] = [1, 1];
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
		if (this.collide()) {
			this.toGrid();
			return false
		}
		
		if (!frozen && frameCount != 0 && frameCount % (keyIsDown(DOWN_ARROW) ? 5 : 30) == 0) {
			this.y++;
		}
		return true
	}

	collide(y = this.y) {
		if (y + 2 >= gHeight) {
			return true
		}
		if (grid[y + 2][this.x] != 0 || grid[y + 2][this.x + 1] != 0) {
			return true
		}
		return false
	}
	move() {
		super.move();
		if (frameCount % 7 == 0) {
			if (this.moveLeft) {
				this.moveLeft = false;
				if (this.x != 0) {
					if (grid[this.y][this.x - 1] == 0 && grid[this.y + 1][this.x - 1] == 0)
						this.x--;
				}
			}
			if (this.moveRight) {
				this.moveRight = false;
				if (this.x != gWidth - 2) {
					if (grid[this.y][this.x + 2] == 0 && grid[this.y + 1][this.x + 2] == 0)
						this.x++;
				}
			}
		}

	}

	toGrid() {
		grid[this.y][this.x] = this.type;
		grid[this.y][this.x + 1] = this.type;
		grid[this.y + 1][this.x] = this.type;
		grid[this.y + 1][this.x + 1] = this.type;

		super.toGrid();
	}
}