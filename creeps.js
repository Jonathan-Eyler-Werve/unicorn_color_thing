//<!--  Contains functions to create, draw and modify creeps -->

window.game = window.game || {};

var g = window.game;
g.creeps = [];

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
	this.deadCycle = undefined;
	this.drawSize = 50;

	this.drawCreep = drawCreep;
	function drawCreep(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(to_rad(this.direction));
	  ctx.globalAlpha = 0.3;
		ctx.drawImage(this.image,(this.drawSize/-2),(this.drawSize/-2), this.drawSize, this.drawSize);
	  ctx.restore();
	};
};

function drawLogo(ctx){
		var thisLogo = new Image();
		thisLogo.src = imgPolyLogo;
		console.log(thisLogo)
		ctx.save();
	  // ctx.translate(this.posX, this.posY);
	  // ctx.rotate(to_rad(this.direction));
		ctx.drawImage(thisLogo, g.canvasEdgeX/2-500, g.canvasEdgeY/2-50);
	  ctx.restore();
};


function drawAllCreeps(ctx){
	for (var i = 0; i < g.creeps.length; i++) {
    if (g.creeps[i] != undefined) {   
      g.creeps[i].drawCreep(ctx);
    };
  };
};

function updateCreeps(){

	if (countCollection(g.creeps) < 20){
		createCreep(g.canvasEdgeX/2,g.canvasEdgeY/2);	
	};

	// console.log(countCollection(creeps));
	

	for (var i = 0; i < g.creeps.length; i++) {
    if (g.creeps[i] != undefined) {

	    g.creeps[i].direction = g.creeps[i].direction + ((g.creeps[i].randomMedium - 5) * .1);
	    g.creeps[i].posX = g.creeps[i].posX + ((g.creeps[i].randomShort - 5) * .5);
	    g.creeps[i].posY = g.creeps[i].posY + ((g.creeps[i].randomMedium - 5) * .3);

	    if (Math.abs(g.creeps[i].posX - 500) > 1000 || Math.abs(g.creeps[i].posY - 400)  > 800) {
	    	g.creeps[i].hitPoints = 0;
	    };	

	    if (g.creeps[i].hitPoints < 1) {
	    	if (g.creeps[i].deadCycle == undefined) { 
	    		g.creeps[i].deadCycle = g.gameLoopCounter;
	    	};
	    	deathRattle(g.creeps[i].posX, g.creeps[i].posY, i);
	    	if (g.creeps[i].deadCycle < (g.gameLoopCounter - 0)) {
	    		g.creeps[i] = undefined; 
	    	};
	    };

	  };  
	};
};


function hitCreep(i){
	g.creeps[g.towers[i].targetCreep].image.src = imgUnicorn;
	g.creeps[g.towers[i].targetCreep].drawSize = 100;
	g.creeps[g.towers[i].targetCreep].hitPoints = g.creeps[g.towers[i].targetCreep].hitPoints - 10;
};

function createCreep(x,y){
	if (g.gameLoopCounter % 60 == 1){
		console.log("create Creep!")
		g.creeps.push(new creep(x,y,0,20));
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

		if (g.gameLoopCounter%30 == 1){	// SHORT random factor generator
		console.log("%30")
		for (var i = 0; i < g.creeps.length; i++) {
		    g.creeps[i].randomShort = to_i(((Math.random() * 10) + 1));
		    console.log(g.creeps[i].randomLong)
		};
	};

	if (g.gameLoopCounter%100 == 1){	// MEDIUM random factor generator
		console.log("%100")
		for (var i = 0; i < g.creeps.length; i++) {
		    g.creeps[i].randomMedium = to_i(((Math.random() * 10) + 1));
		    console.log(g.creeps[i].randomMedium)
		};
	};

	if (g.gameLoopCounter%1000 == 1){	// LONG random factor generator
		console.log("%1000")
		for (var i = 0; i < g.creeps.length; i++) {
		    g.creeps[i].randomLong = to_i(((Math.random() * 10) + 1));
		    console.log(g.creeps[i].randomLong)
		};
	};
}


// DRIVER CODE FOR DEV

// var my_creep = new creep(220,220,0,10);
// var my_creep2 = new creep(300,500,0,10);
// var my_creep3 = new creep(400,300,0,10);
// g.creeps.push(my_creep);
// g.creeps.push(my_creep3);
// g.creeps.push(my_creep2);

// var my_creep = new creep(200,200,0,10);
// var my_creep2 = new creep(400,500,0,10);
// var my_creep3 = new creep(200,500,0,10);
// g.creeps.push(my_creep);
// g.creeps.push(my_creep3);
// g.creeps.push(my_creep2);
