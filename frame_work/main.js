var akuma;

function preload() {
	sf_font = loadFont("assets/Act_Of_Rejection.ttf");

	stage = loadImage("assets/stage.png");//1260x787 pixels

	for (var i = 0; i < 14; i++){
		car[i] = loadImage("assets/car/car_" + i + ".png");//400x300 pixels
	}

}

function setup() {
	createCanvas(1200, 1200);
	background(0);

	textSize(40);
	textFont(sf_font);

	akuma = createSprite(200, 250, 250, 250);
	var idle_anim = akuma.addAnimation('standing', 'assets/akuma/18273.png', 'assets/akuma/18282.png');
}

function draw() {
   clear();
   stage.resize(1200, 0);
   image(stage,0,0);

   fill(255,alert,0);
   text(timer+" s", 800, 40);

   fill(255,140,0);
   text(score+" pts",100,40);

   akuma.changeAnimation('standing');
   akuma.mirrorX(-1);


   if (timer < 11) {
   	alert = 0; // changes timer text to red when 10 seconds or lower
   }

   if (frameCount % 60 ==0 && timer > 0 && car_hp > 0){//// if the frameCount is divisible by 60, then subtract 1 from the timer. it will stop at 0 seconds or if the car HP hits zero
   	timer --;
   }



   car[car_form].resize(0,450);
   image(car[car_form], 275, 250);

   drawSprites();

}

function mousePressed() {
	if (car_hp > 0 && car_form < 13){
		car_hp -= 100;//car hp decreases every mouseclick
		car_form += 1;//goes to next form in car image array
		score += 100;//score goes up by 100
	}
}



