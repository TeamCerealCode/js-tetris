class board extends menuObject {
	constructor() {
		super();
		this.block;

		this.keys = {
			"up" : 38,
			"down" : 40,
			"left" : 37,
			"right" : 39,
			"rotCW" : 88,
			"rotCCW" : 90,
			"hold" : 32,
			"harddrop" : 38,
			"debug1" : 188,
			"debug2" : 190
		}

		this.gWidth = 10; // grid width
		this.gHeight = 22; // grid height
		this.tSize = 20; // tile size
		this.startX = (width / 2) - (this.gWidth * this.tSize / 2);
		this.startY = (height / 2) - (this.gHeight * this.tSize / 2);

		this.level = 1;
		this.score = 0;

		this.backtoback;
		this.combo = 0;

		this.hold = 0;
		this.upcoming = [];
		this.bag = [];
		this.harddrop = false;
		this.debugMode = false;
		this.frozen = this.debugMode;
		this.debugColor = 8;
		this.hasHeld = false;
		this.lost = false;

		this.newGrid();

		this.newBag();
		for (let i = 0; i < 5; i++)
			this.newUpcoming();
		this.newPiece();
	}

	newGrid() {
		this.grid = [];
		for (let j = 0; j < this.gHeight; j++) {
			var row = [];
			for (let i = 0; i < this.gWidth; i++) {
				row.push(0);
			}
			this.grid.push(row);
		}
	}

	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	newBag() {
		let pieces = [1, 2, 3, 4, 5, 6, 7];
		this.shuffleArray(pieces);
		this.bag = pieces;
	}

	newPiece(hld) {
		var piece;
		if (hld) {
			this.hasHeld = true
			if (this.hold == 0) {
				piece = getPiece(this.getUpcoming());
			} else {
				piece = getPiece(this.hold);
			}
		} else {
			piece = getPiece(this.getUpcoming());
		}
		this.block = new piece(int(this.gWidth / 2) - 2, 0);
	}

	newUpcoming() {
		this.upcoming.push(this.bag.shift());
		if (this.bag.length == 0) {
			this.newBag();
		}
	}

	getUpcoming() {
		this.newUpcoming();
		return this.upcoming.shift();
	}

	draw() {
		background(0);
		strokeWeight(1);
		this.drawGrid();

		this.block.draw();
		this.block.drawShadow();
		if (this.block.update() == false) {
			this.newPiece();
		}
		if (this.hold != 0) {
			var c = getPiece(this.hold)
			c = new c(0, 0)
			c.draw(true, this.startX - ((c.size + 1) * this.tSize), this.startY);
		}
		this.drawUpcoming();
		fill(255);
		text(this.score, 30, height - 30);
	}

	keyPressed() {
		if (keyCode == this.keys["debug1"])
			this.debugMode = !this.debugMode;
		if (keyCode == this.keys["debug2"])
			this.frozen = !this.frozen;
		if (keyCode == this.keys["harddrop"])
			this.harddrop = true;
		if (keyCode == this.keys["rotCW"])
			this.block.rotate();
		if (keyCode == this.keys["rotCCW"])
			this.block.rotate(false);
		if (keyCode == this.keys["hold"]) {
			if (!this.hasHeld) {
				var t = this.block.type
				this.newPiece(true);
				this.hold = t;
			}
		}
	}

	pieceDropped() {
		let linesC = this.clearLines();
		if (linesC != 4)
			this.backtoback = null;
		if (linesC) {
			this.combo++;
			if (linesC == 1)
				this.score += 100 * this.level;
			else if (linesC == 2)
				this.score += 300 * this.level;
			else if (linesC == 3)
				this.score += 500 * this.level;
			else if (linesC == 4 && this.backtoback == "tetris")
				this.score += 1200 * this.level;
			else if (linesC == 4) {
				this.score += 800 * this.level;
				this.backtoback = "tetris";
			}
			if (this.combo > 1) {
				this.score += 50 * this.combo * this.level;
			}
		} else {
			this.combo = 0;
		}
		this.hasHeld = false;
	}

	drawGrid() {
		noFill();
		stroke(50);
		for (let i = 1; i < this.gWidth; i++) {
			line(i * this.tSize + this.startX, this.startY,
				i * this.tSize + this.startX, this.startY + this.gHeight * this.tSize);
		}
		for (let i = 1; i < this.gHeight; i++) {
			line(this.startX, i * this.tSize + this.startY,
				this.startX + this.gWidth * this.tSize, i * this.tSize + this.startY);
		}

		noStroke();
		fill(200);
		for (let j = 0; j < this.gHeight; j++) {
			for (let i = 0; i < this.gWidth; i++) {
				var type = this.grid[j][i];
				if (type != 0) {
					if (!this.lost)
						fill(COLORS[type]);
					else
						fill(COLORS[8]);
					rect(i * this.tSize + this.startX, j * this.tSize + this.startY, this.tSize, this.tSize);
				}
			}
		}

		noFill();
		stroke(150);
		rect(this.startX, this.startY, this.gWidth * this.tSize, this.gHeight * this.tSize);

		if (this.debugMode) {
			this.debugMouse();
		}
	}

	drawUpcoming() {
		let y = this.startY;
		for (let i = 0; i < 5; i++) {
			let cur = getPiece(this.upcoming[i]);
			cur = new cur(0, 0);
			cur.draw(true, this.startX + (this.gWidth * this.tSize) + this.tSize, y);
			let s = cur.size;
			s = s <= 2 ? 3 : s
			y += s * this.tSize;
		}
	}

	clearLines() {
		let linesC = 0;
		for (let i = 0; i < this.gHeight; i++) {
			let row = this.grid[i];
			if (row.every(x => x != 0)) {
				linesC++;
				this.movedown(i);
			}
		}
		return linesC;
	}

	movedown(h) {
		for (let i = h - 1; i > 0; i--) {
			this.grid[i + 1] = this.grid[i].slice();
		}
		for (let j = 0; j < this.gWidth; j++) {
			this.grid[0][j] = 0;
		}
	}

	debugMouse() {
		noStroke();
		let y = 5;
		let s = 50;
		for (let col in COLORS) {
			fill(COLORS[col]);
			rect(5, y, s, s);
			y += s + 5;
		}
		noFill();
		stroke(255, 0, 0);
		rect(5, y, s, s);

		if (mouseIsPressed) {
			y = 5;
			let len = Object.keys(COLORS).length;
			for (let i = 1; i <= len + 1; i++) {
				if (mouseX > 5 && mouseX < s + 5 && mouseY > y && mouseY < y + s) {
					this.debugColor = i
					return
				}
				y += s + 5;
			}
			this.debugColor %= len + 1

			var gMouseX = int((mouseX - this.startX) / this.tSize);
			var gMouseY = int((mouseY - this.startY) / this.tSize);
			if (gMouseX < 0 || gMouseX > this.gWidth - 1 || gMouseY < 0 || gMouseY > this.gHeight - 1)
				return
			this.grid[gMouseY][gMouseX] = this.debugColor;
		}
	}
}