class OPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 4, 2);
		this.grid[0] = [1, 1];
		this.grid[1] = [1, 1];
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