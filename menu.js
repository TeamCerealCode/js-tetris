class menuObject {
	constructor() {
		// a button is a element that contains, area, callback, and text
		// {pos : [x1,y1,x2,y2],callback = (), text = "something"}
		this.buttons = [];
		this.outline = "#022b66";
		this.fill = "#000000";
		this.textCol = "#ffffff";
	}

	draw() {
		for (let button of this.buttons) {
			stroke(this.outline);
			fill(this.fill);
			let area = button.pos;
			rect(area[0],area[1],area[2]-area[0],area[3]-area[1]);
			fill(this.textCol);
			textAlign(CENTER, CENTER);
			text(button.text,(area[2]-area[0])/2+area[0],(area[3]-area[1])/2+area[1]);
		}
	}

	update() {
		// add
	}

	mousePressed() {
		for (let button of this.buttons) {
			let area = button.pos;
			if (mouseX > area[0] && mouseY > area[1] &&
				mouseX < area[2] && mouseY < area[3]) {
				button.callback();
			}
		}
	}

	keyPressed() {
		// add
	}

}