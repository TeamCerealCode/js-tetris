function getPiece(type) {
	// super temporary
	if (type == 1)
		return IPiece
	if (type == 2)
		return JPiece
	if (type == 3)
		return LPiece
	if (type == 4)
		return OPiece
	if (type == 5)
		return SPiece
	if (type == 6)
		return ZPiece
	if (type == 7)
		return TPiece
}
class IPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 1, 4);
		this.grid[0] = [0, 0, 0, 0];
		this.grid[1] = [1, 1, 1, 1];
		this.grid[2] = [0, 0, 0, 0];
		this.grid[3] = [0, 0, 0, 0];
	}
}
class JPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 2, 3);
		this.grid[0] = [1, 0, 0];
		this.grid[1] = [1, 1, 1];
		this.grid[2] = [0, 0, 0];
	}
}
class LPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 3, 3);
		this.grid[0] = [0, 0, 1];
		this.grid[1] = [1, 1, 1];
		this.grid[2] = [0, 0, 0];
	}
}
class OPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 4, 2);
		this.grid[0] = [1, 1];
		this.grid[1] = [1, 1];
	}
}
class SPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 5, 3);
		this.grid[0] = [0, 1, 1];
		this.grid[1] = [1, 1, 0];
		this.grid[2] = [0, 0, 0];
	}
}
class ZPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 6, 3);
		this.grid[0] = [1, 1, 0];
		this.grid[1] = [0, 1, 1];
		this.grid[2] = [0, 0, 0];
	}
}
class TPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 7, 3);
		this.grid[0] = [0, 1, 0];
		this.grid[1] = [1, 1, 1];
		this.grid[2] = [0, 0, 0];
	}
}