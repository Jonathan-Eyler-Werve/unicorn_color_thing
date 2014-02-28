//<!--  Contains functions to create, draw and modify towers -->

// Image paths

var imgRoundArrow = 'images/icon_5438.svg'; // Arrow by Jamison Wieser from The Noun Project

// 

function tower(posX,posY){
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
	  ctx.rotate(this.direction);
		ctx.drawImage(this.image,-50,-50);
	  ctx.restore();
	};

};

function drawAllTowers(ctx){
	for (var i = 0; i < towers.length; i++) {
       towers[i].drawTower(ctx);
       console.log("tower " + i + " direction: " +towers[i].direction)
  };
};

function updateTowers(){
	for (var i = 0; i < towers.length; i++) {
		towers[i].targetCreep = findClosestTarget(i);
		towers[i].direction = aimTower(towers[i].posX,towers[i].posY,towers[i].targetCreep)
		// console.log("target creep tower " + i +"; creep = "+ towers[i].targetCreep)
	};
};

function findClosestTarget(towerIndex) { // finds nearest creep 
	var creepDistance = undefined;
	for (var i = 0; i < creeps.length; i++) {
		if (creeps[i] != undefined) {

			var _distance =	getDistance(towerIndex, i)

			if (creepDistance > _distance || creepDistance == undefined) {
				index = i;
				creepDistance = _distance; 
				// console.log("findClosestTarget: index set to " + i)
			};
		};
	};
	return index 	
};

// FIND DIRECTION OF CREEP. 








function getDistance(towerIndex, creepIndex){ // FIND DISTANCE FROM TOWER TO CREEP
	var distanceX = creeps[creepIndex].posX - towers[towerIndex].posX 
	var distanceY = creeps[creepIndex].posY - towers[towerIndex].posY 
	var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
	return distance 
};


// DO THESE TWO THINGS INTERSECT? 

 

function aimTower(x, y, _target) {
	
	var _distanceX = (creeps[_target].posX) - x;
	var _distanceY = ((creeps[_target].posY) - y ) * -1;
 	var _direction = Math.atan2(_distanceX, _distanceY)
 	return _direction
};


var towers = [];

// DRIVER CODE FOR DEV


var mah_tower = new tower(100,200);
towers.push(mah_tower)

var my_tower = new tower(100,300);
towers.push(my_tower)

var my_other_tower = new tower(500,300);
towers.push(my_other_tower)