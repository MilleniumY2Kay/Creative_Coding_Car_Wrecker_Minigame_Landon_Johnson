var stage;
var player = [];
var car = [];
var intro;

var car_hp = 1400;
var car_form = 0;

var score = 0;
var timer = 40;
var alert = 140;

var active = false;
var left = true;


function preload() {
	stage = loadImage("assets/stage.png");//1260x787 pixels

	for (var i = 0; i < 14; i++){
		car[i] = loadImage("assets/car/car_" + i + ".png");//400x300 pixels
	}
	for (var i = 0; i < 10; i++){
		player[i] = loadImage("assets/old_sprites/ryu_stand/ryu_stand_" + i + ".png");
	}
	idle = loadAnimation(player[0], player[1],player[2],player[3],player[4],player[5]);
}

function setup() {
	createCanvas(1260,787);
	background(0);

}

function draw() {
   clear();
   stage.resize(600,0);
   image(stage,0,0);

   textSize(40);

   fill(255,140,0);
   text(timer+"s", 500, 30);

   fill(255,140,0);
   text(score+"pts",30,30);

   if (frameCount % 60 ==0 && timer > 0 && car_hp > 0){
   	timer --;
   }
   //car[car_form].resize(600,0);
   image(car[car_form],150,50);

   animation(idle, 120, 240);

}

function MousePressed() {
	if (car_hp > 0){
		car_hp -= 100;
		car_form += 1;
	}
}



