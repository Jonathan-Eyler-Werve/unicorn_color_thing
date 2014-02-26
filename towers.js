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

};

function drawAllTowers(ctx){
	for (var i = 0; i < towers.length; i++) {
       towers[i].drawTower(ctx);
  };
};

function updateTowers(){
	for (var i = 0; i < towers.length; i++) {
		towers[i].targetCreep = findClosestTarget(towers[i].posX,towers[i].posY);
		towers[i].direction = aimTower(towers[i].posX,towers[i].posY,towers[i].targetCreep)
		// console.log("target creep tower " + i +"; creep = "+ towers[i].targetCreep)
	};
};

function findClosestTarget(x, y) { // finds nearest creep 
	var creepDistance = undefined;
	for (var i = 0; i < creeps.length; i++) {
		if (creeps[i] != undefined) {

			var distanceX = creeps[i].posX - x 
			var distanceY = creeps[i].posY - y 
			var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))

			if (creepDistance > distance || creepDistance == undefined) {
				index = i;
				creepDistance = distance; 
				// console.log("findClosestTarget: index set to " + i)
			};
		};
	};
	return index 	
};

function aimTower(x, y, target) {
	
	var distanceX = target.posX - x; 
	var distanceY = target.posY - y;
 	var direction = Math.atan(450/120)
 	alert(direction)
 	return direction
};


var towers = [];

// DRIVER CODE FOR DEV


var my_tower = new tower(500,500,180,10);
towers.push(my_tower)

var my_other_tower = new tower(200,100,180,10);
towers.push(my_other_tower)