//<!--  Contains functions to create, draw and modify creeps -->

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
    if (creeps[i] != undefined) {   
      creeps[i].drawCreep(ctx);
    };
  };
};

function updateCreeps(){

	for (var i = 0; i < creeps.length; i++) {
    if (creeps[i] != undefined) {

	    creeps[i].direction = creeps[i].direction + ((creeps[i].randomMedium - 5) * .3);
	    creeps[i].posX = creeps[i].posX + ((creeps[i].randomShort - 5) * .5);
	    creeps[i].posY = creeps[i].posY + ((creeps[i].randomMedium - 5) * .5);
	    
	    // OVERTAKEN BY NEW TOWER CODE 
	    // if (amIHit(creeps[i], creeps[i].posX, creeps[i].posY, creeps[i].size) == true) {
	    // 	creeps[i].hitPoints = creeps[i].hitPoints - randomShort; 	
	    // };
	    
	    if (creeps[i].hitPoints < 1) {

	    	if (creeps[i].deadCycle == undefined) { 
	    		creeps[i].deadCycle = gameLoopCounter;
	    	};

	    	deathRattle(creeps[i].posX, creeps[i].posY, i);

	    	if (creeps[i].deadCycle < (gameLoopCounter - 50)) {
	    		creeps[i] = undefined; 
	    	};

	    };
	  };  
	};

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

var creeps = [];

// DRIVER CODE FOR DEV

var my_creep = new creep(200,200,180,10);
var my_creep2 = new creep(100,500,180,10);
var my_creep3 = new creep(200,100,180,10);
creeps.push(my_creep)
creeps.push(my_creep3)
creeps.push(my_creep2)


// var my_other_creep = new creep(150,150,180,10);
// creeps.push(my_other_creep)

// console.log(my_creep);
// console.log(creeps);
// console.log(creeps[0].direction)