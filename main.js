var cMenu = titleMenu; //current menu

function setup() {
	createCanvas(500, 500);
	cMenu = new cMenu();
}

function draw() {
	cMenu.draw();
}

function keyPressed() {
	cMenu.keyPressed();
}

function mousePressed() {
	cMenu.mousePressed();
}