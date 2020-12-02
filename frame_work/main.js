var stage;
var player;
var car;
var intro;

var active = false;
var left = true;


function preload() {
	stage = loadImage("assets/stage.png");//1260x787 pixels

	car = loadImage("assets/car/car_0.png");//400x300 pixels
	
	player = loadSpriteSheet("assets/akuma_intro1.png",88 ,114 ,18 );

	intro = loadAnimation(player);
}

function setup() {
	createCanvas(1260,787);
	background(0);

}

function draw() {
   clear();
   image(stage,0,0);

   car.resize(600,0);
   image(car,350,300);

   animation(intro, 200, 200);


}

