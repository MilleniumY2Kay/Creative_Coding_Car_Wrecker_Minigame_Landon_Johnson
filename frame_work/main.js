var stage;
var ryu;
var car;

function preload() {
	stage = loadImage("assets/stage.png");
	ryu = loadImage("assets/ryu_standing.gif");
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