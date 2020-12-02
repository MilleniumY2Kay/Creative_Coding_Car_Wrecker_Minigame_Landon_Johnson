var stage;
var player;
var car;

var active = false;
var left = true;

function preload() {
	stage = loadImage("assets/stage.png");//1260x787 pixels

	car = loadImage("assets/car/car_0.png");//400x300 pixels
	
	player = loadImage("assets/akuma_spritesheet.png");
}

function setup() {
	createCanvas(1260,787);
	background(0);

}

function draw() {
   image(stage,0,0);

   car.resize(600,0);
   image(car,350,300);
}

