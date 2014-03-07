//<!--  Contains functions to create, draw and modify creeps -->

var creeps = [];

function creep(posX,posY,direction,hitPoints){
	this.posX = posX;
	this.posY = posY;
	this.direction = direction;
	this.hitPoints = hitPoints;
	this.size = 10;
	this.image = new Image();
	this.image.src = imgRudolf;
	this.randomShort = 5;
	this.randomMedium = 5;
	this.randomLong = 5;
	this.deadCycle = undefined;

	this.drawCreep = drawCreep;
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
    if (creeps[i] != undefined) {   
      creeps[i].drawCreep(ctx);
    };
  };
};

function updateCreeps(){

	createCreep(400,400);

	for (var i = 0; i < creeps.length; i++) {
    if (creeps[i] != undefined) {

	    creeps[i].direction = creeps[i].direction + ((creeps[i].randomMedium - 5) * .3);
	    creeps[i].posX = creeps[i].posX + ((creeps[i].randomShort - 5) * .5);
	    creeps[i].posY = creeps[i].posY + ((creeps[i].randomMedium - 5) * .5);

	    if (creeps[i].hitPoints < 1) {

	    	if (creeps[i].deadCycle == undefined) { 
	    		creeps[i].deadCycle = gameLoopCounter;
	    	};

	    	deathRattle(creeps[i].posX, creeps[i].posY, i);

	    	if (creeps[i].deadCycle < (gameLoopCounter - 500)) {
	    		creeps[i] = undefined; 
	    	};
	    };
	  };  
	};
};


function createCreep(x,y){
	if (gameLoopCounter % 100 == 1){
		console.log("create Creep!")
		creeps.push(new creep(x,y,0,20));
	}
};



function amIHit(creep,posX,posY,size){
	return false; // temporary! 
};

function deathRattle(posX, posY, creepIndex){
	// alert("deathRattle - a creep has died")
	// console.log("deathRattle called")
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


// DRIVER CODE FOR DEV

var my_creep = new creep(220,220,0,10);
var my_creep2 = new creep(300,500,0,10);
var my_creep3 = new creep(400,300,0,10);
creeps.push(my_creep);
creeps.push(my_creep3);
creeps.push(my_creep2);

var my_creep = new creep(200,200,0,10);
var my_creep2 = new creep(400,500,0,10);
var my_creep3 = new creep(200,500,0,10);
creeps.push(my_creep);
creeps.push(my_creep3);
creeps.push(my_creep2);
