
function preload() {

	//font
	sf_font = loadFont("assets/Act_Of_Rejection.ttf");

	
	//sound
	soundFormats('ogg', 'mp3');
	theme = loadSound('assets/akuma_theme.mp3');
	

	//image
	stage = loadImage("assets/stage.png");//1260x787 pixels

	for (var i = 0; i < 14; i++){
		car[i] = loadImage("assets/car/car_" + i + ".png");//400x300 pixels
	}

}

function setup() {
	createCanvas(1200, 1200);
	background(0);

	//text stuff
	textSize(40);
	textFont(sf_font);

	//music
	theme.play();
	theme.loop();

	//sprite stuff
	akuma = createSprite(200, 500, 500, 500); //akuma sprite
	akuma.scale = 2;
	akuma.frameDelay = 1;

	var idle_anim = akuma.addAnimation('standing', 'assets/akuma/18273.png', 'assets/akuma/18282.png'); //standing animation
	var taunt = akuma.addAnimation('taunt', 'assets/akuma/19034.png', 'assets/akuma/19039.png');
	var taunt_hold = akuma.addAnimation('taunt hold', 'assets/akuma/19037.png', 'assets/akuma/19039.png');
	var turn = akuma.addAnimation('turn','assets/akuma/18283.png','assets/akuma/18284.png'); //turn around
	var walk_f = akuma.addAnimation('walk_forward', 'assets/akuma/18286.png', 'assets/akuma/18290.png');//walk forward
	var jab = akuma.addAnimation('jab','assets/akuma/18624.png','assets/akuma/18628.png');//straight quick jab


}

function draw() {
   clear();
   stage.resize(1200, 0);
   image(stage,0,0);

   //car placement
   car[car_form].resize(0,450);
   image(car[car_form], 275, 250);

   //akuma animation constants
   akuma.mirrorX(back);
   akuma.changeAnimation('standing');
   akuma.velocity.x = 0;
   akuma.velocity.y = 0;
  
   //onscreen text
   fill(255,alert,0);
   text(timer+" s", 800, 40);
   fill(255,140,0);
   text(score+" pts",100,40);

   //timer and score controls
   if (ggs === false) {

   	if (timer === 0 || car_hp <= 0) {//if car is destroyed or time runs out, game ends and final score is calculated
   		for (var i = 1; i <= timer; i++) {
   			score += i*100;
   		}
   		
   		ggs = true;
   	}
   if (timer < 11) {
   		alert = 0; // changes timer text to red when 10 seconds or lower
   }
   if (frameCount % 30 ==0 && timer > 0 && car_hp > 0){//// if the frameCount is divisible by 60, then subtract 1 from the timer. it will stop at 0 seconds or if the car HP hits zero
   		timer --;
   }
   }

   if (ggs === true) {//prints u win if u destroy car before time runs out
   	

   	textSize(100);
   	if (timer > 0 && car_hp <= 0) {
   		fill(0,255,0);
   		text("YOU WIN!", 500, 400);
   		akuma.changeAnimation('taunt');
   		}else {
   			fill(255,255,0);
   			text("TIME OUT!", 500, 400);
   			akuma.changeAnimation('taunt');
   			akuma.changeAnimation('taunt hold');
   		}

   }
   


   

   //Controls
   if(mouseX < akuma.position.x - 10) {
    akuma.changeAnimation('walk_forward');
    //flip horizontally
    akuma.mirrorX(1);
    //negative x velocity: move left
    akuma.velocity.x = -2;
  }
  else if(mouseX > akuma.position.x + 10) {
    akuma.changeAnimation('walk_forward');
    //unflip
    akuma.mirrorX(-1);
    akuma.velocity.x = 2;
  }
  else {
    //if close to the mouse, don't move
    akuma.changeAnimation('standing');
    akuma.velocity.x = 0;
}

   drawSprites();

}



  function mousePressed() {
	/*if (ggs === false) {
		akuma.changeAnimation('jab');
		if (car_hp > 0 && car_form < 13){
			car_hp -= 100;//car hp decreases every mouseclick
			car_form += 1;//goes to next form in car image array
			score += 100;//score goes up by 100
		}

	}*/
}


