class titleMenu extends menuObject {
	constructor() {
		super();
		this.buttons = [{
			pos: [30, 30, 150, 140],
			callback: () => {
				cMenu = new board();
			},
			text: "START GAME!"
		}]
	}
}