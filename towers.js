//<!--  Contains functions to create, draw and modify towers -->

// Image paths

var imgRoundArrow = 'images/icon_5438.svg';

// 

function tower(posX,posY,type){
	this.posX=posX;
	this.posY=posY;
	this.direction= 0;
	this.size= 10;
	this.image = new Image();
	this.image.src = imgRoundArrow;
	this.randomShort = 5;
	this.randomMedium = 5;
	this.randomLong = 5;
	this.targetCreep = undefined;

	this.drawTower=drawTower;
	function drawTower(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(to_rad(this.direction));
		ctx.drawImage(this.image,-50,-50);
	  ctx.restore();
	};


	function aimTower(target) {
		// points tower direction at targetCreep 
	};

};

function updateTowers(){

	for (var i = 0; i < towers.length; i++) {
		towers[i].targetCreep = findClosestTarget(towers[i].posX,towers[i].posY);
	};

};

function findClosestTarget(x,y) { // finds nearest creep 
	var index = undefined
	for (var i = 0; i < creeps.length; i++) {

		// creepX, creepY - posx, posY = diff
		// diff to distance  
		// sort by distance 

	};
};

var towers = [];

var my_tower = new tower(500,500,180,10);

towers.push(my_tower)