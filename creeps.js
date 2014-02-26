//<!--  Contains functions to create, draw and modify creeps -->

// Image paths

var imgIndifferentSmily = 'images/icon_27452.svg';

// 

function creep(posX,posY,direction,hitPoints){
	this.posX = posX;
	this.posY = posY;
	this.direction = direction;
	this.hitPoints = hitPoints;
	this.size = 10;
	this.image = new Image();
	this.image.src = imgIndifferentSmily;
	this.randomShort = 5;
	this.randomMedium = 5;
	this.randomLong = 5;

	this.drawCreep=drawCreep;
	function drawCreep(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(to_rad(this.direction));
		ctx.drawImage(this.image,-50,-50);
	  ctx.restore();
	};
};

function drawCreep(ctx){
	ctx.save();
  ctx.translate(this.posX, this.posY);
  ctx.rotate(to_rad(this.direction));
	ctx.drawImage(this.image,-25,-25);
  ctx.restore();
};

function drawAllCreeps(ctx){
	for (var i = 0; i < creeps.length; i++) {
       creeps[i].drawCreep(ctx);
  };
};

function updateCreeps(){

	for (var i = 0; i < creeps.length; i++) {
	    creeps[i].direction = creeps[i].direction + creeps[i].randomMedium - 5;
	    creeps[i].posX = creeps[i].posX + creeps[i].randomShort - 2;
	    creeps[i].posY = creeps[i].posY + creeps[i].randomMedium - 2;
	    
	    if (amIHit(creeps[i], creeps[i].posX, creeps[i].posY, creeps[i].size) == true) {
	    	creeps[i].hitPoints = creeps[i].hitPoints - randomShort; 	
	    };
	    
	    if (creeps[i].hitPoints < 1) {
	    	deathRattle(creeps[i].posX, creeps[i].posY);
	    	delete creeps[i]; // not using splice because extra cycles to reindex  
	    };

	};

};



function amIHit(creep,posX,posY,size){
	return false; // temporary! 
};

function deathRattle(posX, posY){
	alert("deathRattle - a creep has died")
	console.log("deathRattle called")
};


function updateRandomFactors(collection){

		if (gameLoopCounter%30 == 1){	// SHORT random factor generator
		console.log("%30")
		for (var i = 0; i < creeps.length; i++) {
		    creeps[i].randomShort = to_i(((Math.random() * 10) + 1));
		    console.log(creeps[i].randomLong)
		};
	};

	if (gameLoopCounter%100 == 1){	// MEDIUM random factor generator
		console.log("%100")
		for (var i = 0; i < creeps.length; i++) {
		    creeps[i].randomMedium = to_i(((Math.random() * 10) + 1));
		    console.log(creeps[i].randomMedium)
		};
	};

	if (gameLoopCounter%1000 == 1){	// LONG random factor generator
		console.log("%1000")
		for (var i = 0; i < creeps.length; i++) {
		    creeps[i].randomLong = to_i(((Math.random() * 10) + 1));
		    console.log(creeps[i].randomLong)
		};
	};
}

var creeps = [];

// DRIVER CODE FOR DEVELOPMENT



var my_creep = new creep(100,100,180,10);
creeps.push(my_creep)

var my_other_creep = new creep(150,150,180,10);
creeps.push(my_other_creep)

// console.log(my_creep);
// console.log(creeps);
// console.log(creeps[0].direction)