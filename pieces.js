let wallkick = [
	// Test 1
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	// Test 2
	[[-1,0],[+1,0],[+1,0],[-1,0],[+1,0],[-1,0],[-1,0],[+1,0]],
	// Test 3
	[[-1,-1],[+1,1],[+1,1],[-1,-1],[+1,-1],[-1,1],[-1,1],[+1,-1]],
	// Test 4
	[[0,2],[0,-2],[0,-2],[0,2],[0,2],[0,-2],[0,-2],[0,2]],
	// Test 5
	[[-1,2],[+1,-2],[+1,-2],[-1,2],[+1,2],[-1,-2],[-1,-2],[+1,2]]
]

let wallkickI = [
	// Test 1
	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
	// Test 2
	[[-2,0],[+2,0],[-1,0],[+1,0],[+2,0],[-2,0],[+1,0],[-1,0]],
	// Test 3
	[[+1,0],[-1,0],[+2,0],[-2,0],[-1,0],[+1,0],[-2,0],[+2,0]],
	// Test 4
	[[-2,-1],[+2,+1],[-1,+2],[+1,-2],[+2,+1],[-2,-1],[+1,-2],[-1,+2]],
	// Test 5
	[[+1,+2],[-1,-2],[+2,-1],[-2,+1],[-1,-2],[+1,+2],[-2,+1],[+2,-1]]
]

let lookup = ["N0N7","1N2N","N3N4","6N5N"];

function getPiece(type) {
	// super temporary
	switch (type) {
		case 1:
			return IPiece
		case 2:
			return JPiece
		case 3:
			return LPiece
		case 4:
			return OPiece
		case 5:
			return SPiece
		case 6:
			return ZPiece
		case 7:
			return TPiece
	}
}
class IPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 1, 4);
		this.grid = [
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
	}
}
class JPiece extends tetrimino {
	constructor(x, y) {
		super(x, y, 2, 3);
		this.grid = [
			[1, 0, 0],
			[1, 1, 1],
			[0, 0, 0]
		];
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