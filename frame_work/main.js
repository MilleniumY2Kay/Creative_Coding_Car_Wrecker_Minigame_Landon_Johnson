var stage;
var ryu;
var car;

function preload() {
	stage = loadImage("assets/stage.png");
	ryu = loadAnimation("assets/ryu_stand/ryu_stand_0.png","assets/ryu_stand/ryu_stand_1.png");
	car = loadImage("assets/car_0.png");
}

function setup() {
	createCanvas(640,400);
	background(0,100,0);

	var mgr = new SceneMangager ();
	mgr.stage = stage;
	mgr.wire();
	mgr.showScene(intro);
}

function draw() {
   
}

function intro() {
	this.setup = function() {

	}
	this.setup = function() {

	}
}