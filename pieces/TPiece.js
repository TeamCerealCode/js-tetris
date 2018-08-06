class TPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 7, 3);
		this.color = COLORS[this.type];
		this.grid[0] = [0, 1, 0];
		this.grid[1] = [1, 1, 1];
		this.grid[2] = [0, 0, 0];
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
		if (!frozen && frameCount != 0 && frameCount % (keyIsDown(DOWN_ARROW) ? 5 : 30) == 0) {
			this.y++;
		}
		return true
	}
	move() {
		super.move();
		//if (frameCount % 7 == 0) {
			if (this.moveLeft) {
				this.moveLeft = false;
				if (this.x != 0) {
					if (grid[this.x - 1][this.y + 1] == 0 && grid[this.x][this.y] == 0)
						this.x--;
				}
			}
			if (this.moveRight) {
				this.moveRight = false;
				if (this.x != gWidth - 3) {
					if (grid[this.x + 2][this.y] == 0 && grid[this.x + 2][this.y + 1] == 0)
						this.x++;
				}
			}
		//}

	}

	toGrid() {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.grid[i][j] != 0) {
					grid[this.x+j][this.y+i] = this.type;
				}
			}
		}
		super.toGrid();
	}
}