class TPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 7, 3);
		this.grid[0] = [0, 1, 0];
		this.grid[1] = [1, 1, 1];
		this.grid[2] = [0, 0, 0];
	}

	update() {
		super.move();
		if (upArrow) {
			upArrow = false;
			return !super.harddrop();
		}
		if (!frozen) {
			if (super.collide()) {
				super.toGrid();
				return false
			}
		}
		if (!frozen && frameCount != 0 && frameCount % (keyIsDown(DOWN_ARROW) ? 5 : 30) == 0) {
			this.y++;
		}
		return true
	}
}