class mainmenu extends menuObj {
	constructor() {
		super();
		this.buttons = [
		{pos : [30,30,50,40],
		callback : () => {
			console.log("EPIC");
		}, text : "HEL"}
		]
	}
}