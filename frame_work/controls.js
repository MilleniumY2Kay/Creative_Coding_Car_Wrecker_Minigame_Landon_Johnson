//movement
function walk_f(){
	akuma.changeAnimation('walk_forward');
    akuma.mirrorX(back);
    //moves right
    akuma.velocity.x = 2;
}

function walk_b(){
	akuma.changeAnimation('walk_back');
    //flips horizontally
    akuma.mirrorX(back);
    //moves left
    akuma.velocity.x = -2;
}

//normal attacks
function light_atk(){
	active = true;
	dmg = 25;
	akuma.changeAnimation('light');
}


function medium_atk(){
	active = true;
	dmg = 25;
	akuma.changeAnimation('medium');
}

function heavy_atk(){
	active = true;
	dmg = 100;
	akuma.changeAnimation('heavy');
}

//specials

function gohadoken(){
	dmg = 100;

	akuma.changeAnimation('fireball');

	flame = createSprite(akuma.position.x+100, akuma.position.y-30);
	flame.mirrorX(back);
	flame.velocity.x = 5;
	flame.setCollider("circle", 0,80, 40);
	flame.collide(level_car);
	flame.life = 21;
	flame.debug = true;
		
		
	var gohadoken = flame.addAnimation('gohadoken', 'assets/akuma/19134.png', 'assets/akuma/19155.png');
	flame.life = 21;
		
	if (flame.collide(level_car)) {
		car_hp -= dmg;
		score += dmg;
		hitspark = createSprite(flame.position.x+10, flame.position.y);
		var spark1 = hitspark.addAnimation('spark1', 'assets/effects/hitsparks/30102.png', 'assets/effects/hitsparks/30111.png');
		spark1.looping = false;
		hitspark.changeAnimation('spark1');
		hitspark.life = 12;		
	}
}

function goshoryuken(){
	active = true;
	dmg = 200;
	akuma.changeAnimation('shoryu');
	akuma.position.x +=5;
}

function tatsu_zanku(){
	active = true;
	dmg = 150;
	akuma.velocity.x = 2;
	akuma.changeAnimation('tatsu');
	akuma.velocity.x = 0;
}