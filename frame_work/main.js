

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
	frameRate(60);
	createCanvas(1200, 800);
	background(0);

	//text stuff
	textSize(40);
	textFont(sf_font);

	//music
	theme.play();
	theme.loop();

	//sprite stuff
	for (var i = 0; i < 14; i++){
		car[i].resize(0,450);
	}
	level_car = createSprite(600,500);
	level_car.setCollider("rectangle",0,0, 90, 120);

	var destruction = level_car.addAnimation('transform', car[0], car[1], car[2], car[3], car[4], car[5], car[6], car[7], car[8], car[9], car[10], car[11], car[12],  car[13]);
	destruction.playing = false;
	destruction.looping = false;

	akuma = createSprite(200, 500, 500, 500); //akuma sprite
	akuma.scale = 2;
	akuma.setDefaultCollider();

	var idle_anim = akuma.addAnimation('standing', 'assets/akuma/18273.png', 'assets/akuma/18282.png'); //standing animation
	var taunt = akuma.addAnimation('taunt', 'assets/akuma/19034.png', 'assets/akuma/19039.png');
	var taunt_hold = akuma.addAnimation('taunt hold', 'assets/akuma/19037.png', 'assets/akuma/19039.png');

	var walk_f = akuma.addAnimation('walk_forward', 'assets/akuma/18286.png', 'assets/akuma/18290.png');//walk forward

	var light_atk = akuma.addAnimation('light','assets/akuma/18624.png','assets/akuma/18628.png');//straight quick jab
	var mid_atk = akuma.addAnimation('medium', 'assets/akuma/18696.png', 'assets/akuma/18702.png');//straight kick
	var heavy_atk = akuma.addAnimation('heavy', 'assets/akuma/18704.png', 'assets/akuma/18716.png');//roundhouse kick
	var special1 = akuma.addAnimation('shoryu', 'assets/akuma/18958.png', 'assets/akuma/18971.png'); //dark shoryu move
	var special2 = akuma.addAnimation('tatsu', 'assets/akuma/18972.png', 'assets/akuma/18979.png');
	var special3 = akuma.addAnimation('fireball', 'assets/akuma/18944.png', 'assets/akuma/18955.png');

	//hitspark = createSprite(500,500);
	//hitspark.scale = 1;

	//var spark1 = hitspark.addAnimation('spark1', 'assets/effects/hitsparks/29361.png', 'assets/effects/hitsparks/29369.png');
	//spark1.looping = false;


}

function draw() {
   clear();
   stage.resize(1200, 0);
   image(stage,0,0);
   active = false;
   dmg = 0;

   //car placement
   level_car.changeAnimation('transform');
   

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
    //Controls for Movement
   
   if(keyIsDown(LEFT_ARROW)) {
    	akuma.changeAnimation('walk_forward');
    	//flips horizontally
    	akuma.mirrorX(1);
    	//moves left
    	akuma.velocity.x = -2;
  	} else if(keyIsDown(RIGHT_ARROW)) {
    	akuma.changeAnimation('walk_forward');
    	//unflips
    	akuma.mirrorX(-1);
    	//moves right
    	akuma.velocity.x = 2;
  	}else {
    	//if close to the mouse, don't move
    	akuma.changeAnimation('standing');
    	akuma.velocity.x = 0;
    }
 
 	//Controls for attacks
	if(keyWentDown('a')){
		active = true;
		dmg = 25;
		akuma.changeAnimation('light');
	} else if (keyWentDown('s')) {
		active = true;
		dmg = 50;
		akuma.changeAnimation('medium');
		akuma.position.x += 5;
	} else if (keyWentDown('d')){
		active = true;
		dmg = 100;
		akuma.changeAnimation('heavy');
	} else if (keyWentDown('c')) {
		active = true;
		dmg = 200;
		akuma.changeAnimation('shoryu');
		akuma.position.x +=5;
	}else if (keyWentDown('x')) {
		active = true;
		dmg = 150;
		akuma.velocity.x = 2;
		akuma.changeAnimation('tatsu');
		akuma.velocity.x = 0;
	}else if (keyWentDown('z')) {
		active = true;
		dmg = 100;
		akuma.changeAnimation('fireball');
	}


	if (active==true) {
		if (akuma.overlap(level_car)) {
			score += dmg;
			hitspark = createSprite(akuma.position.x+10,akuma.position.y);
			var spark1 = hitspark.addAnimation('spark1', 'assets/effects/hitsparks/30102.png', 'assets/effects/hitsparks/30111.png');
			spark1.looping = false;

			
			hitspark.changeAnimation('spark1');
			hitspark.visible = false;


			
		}
		hitspark.visible = true;
	}
   }

   if (ggs === true) {//prints u win if u destroy car before time runs out
   	

   	textSize(100);
   	if (timer > 0 && car_hp <= 0) {
   		fill(0,255,0);
   		text("YOU WIN!", 500, 400);
   		akuma.changeAnimation('taunt');
   		akuma.changeAnimation('taunt hold');
   		}else {
   			fill(255,255,0);
   			text("TIME OUT!", 500, 400);
   			akuma.changeAnimation('taunt');
   			akuma.changeAnimation('taunt hold');
   		}

   }

   akuma.collide(level_car);
  

   drawSprites();

}


  function mousePressed() {
	/*if (ggs === false) {
		if (car_hp > 0 && car_form < 13){
			car_hp -= 100;//car hp decreases every mouseclick
			destruction.nextFrame();//goes to next form in car image array
			score += 100;//score goes up by 100
		}

	}*/



}

