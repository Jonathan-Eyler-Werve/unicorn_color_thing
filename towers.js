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
	console.log("updateTowers starts")
	for (var i = 0; i < towers.length; i++) {
		towers[i].targetCreep = findClosestTarget(towers[i].posX,towers[i].posY);
		console.log("target creep tower " + i +"; creep = "+ towers[i].targetCreep)
	};
	console.log("updateTowers completes")
};

function findClosestTarget(x,y) { // finds nearest creep 
	var creepDistance = undefined;
	for (var i = 0; i < creeps.length; i++) {
		if (creeps[i] != undefined) {

			var distanceX = creeps[i].posX - x 
			var distanceY = creeps[i].posY - y 
			var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
			console.log("findClosestTarget " + i + ": distance = " + distance) 
			console.log("findClosestTarget " + i + ": creepDistance = " + creepDistance) 
			if (creepDistance > distance || creepDistance == undefined) {
				index = i;
				creepDistance = distance; 
				console.log("findClosestTarget: index set to " + i)
			};
		};
	};
	console.log("Find closest target: index = " + index )
	return index 	
};

var towers = [];

// DRIVER CODE FOR DEV


var my_tower = new tower(500,500,180,10);

towers.push(my_tower)