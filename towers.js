//<!--  Contains functions to create, draw and modify towers -->
// 

var towers = [];

function tower(posX,posY){
	this.posX = posX;
	this.posY = posY;
	this.direction = 0;
	this.directionSetting = 0;
	this.thrustPolar = 0;
	this.thrustX = 0;
	this.thrustY = 0;
	this.inertiaX = 0;
	this.inertiaY = 0;	
	this.size = 10;
	this.image = new Image();
	this.image.src = imgRoundArrow;
	this.image.height = 10;
  this.image.width = 10;
	this.randomShort = 5;
	this.randomMedium = 5;
	this.randomLong = 5;
	this.targetCreep = 0;
	this.towerRange = 15; // this could be an arguement
	this.bornCycle = gameLoopCounter;
	this.explodeCycle = undefined;

	this.drawTower = drawTower;

	function drawTower(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(this.direction);

	  if (this.explodeCycle == undefined){
	  	drawDot(ctx); 
	  }
	  else {
    	ctx.drawImage(this.image,-50,-50); 
	  };

	  ctx.restore();
	};

};

function drawDot(ctx){ // Shorthand for a square dot on canvas
	ctx.beginPath();
  ctx.lineWidth = 5
  ctx.moveTo(0,0);
  ctx.lineTo(0, 5);
  ctx.stroke();
};


function drawAllTowers(ctx){
	for (var i = 0; i < towers.length; i++) {
		if (towers[i] != undefined) {
      towers[i].drawTower(ctx);
    };
  };
};

function updateTowers(){
	createTower();
	for (var i = 0; i < towers.length; i++) {
		if (towers[i] != undefined) {
			towers[i].targetCreep = findClosestTarget(i);
			towers[i].direction = aimTower(i);
			chaseTargets(i);
			explode(i);
		};

	};
};

function createTower(){
	if (gameLoopCounter % 100 == 1){
		console.log("createTower if!")
		towers.push(new tower(250,250));
	};
};


function explode(i) {
	if (creeps[towers[i].targetCreep] == undefined) {
		console.log("explode returns early due to undefined targetCreep")
		return
	};

	var _distance = getDistance(i, towers[i].targetCreep);
	
	if ( (_distance < towers[i].towerRange) && (towers[i].explodeCycle == undefined) ) {		
		towers[i].image.src = imgBang;
		towers[i].explodeCycle = gameLoopCounter;

		splatterCircle(i, 'green', 50);

		creeps[towers[i].targetCreep].image.src = imgUnicorn;
		creeps[towers[i].targetCreep].hitPoints = creeps[towers[i].targetCreep].hitPoints - 10;
		
		// console.log("Explode triggered! Tower: " + i)
		// towers[i].direction = towers[i].direction + 5
	};

	// if ( towers[i].bornCycle + 100 == ){};

	if ( towers[i].explodeCycle < gameLoopCounter - 5)  {		
		towers[i] = undefined;
		// towers[i].image.src = imgBang;
		// towers[i].image.src = imgKaleidoscope;
		// console.log("Explode ended! Tower: " + i)
	};

};


function updateThrustX(i) {
	// console.log("direction " + towers[i].direction)
  return (towers[i].thrustPolar * Math.sin(towers[i].direction));
}; 

function updateThrustY(i) {
	// console.log(towers[i].direction)
  return (-1 * towers[i].thrustPolar * Math.cos(towers[i].direction));
};

function chaseTargets(i){
	towers[i].thrustPolar = 2; // hardcoded for now

	// console.log("tower " + i + ", thrustX = " + updateThrustX(i));

	towers[i].inertiaX = towers[i].inertiaX + updateThrustX(i);
	towers[i].inertiaY = towers[i].inertiaY + updateThrustY(i);

	// console.log("tower " + i + ", inertiaX = " + towers[i].inertiaX);

	towers[i].posX += towers[i].inertiaX;
	towers[i].posY += towers[i].inertiaY;
}; 


function findClosestTarget(towerIndex) { // finds nearest creep 
	var creepDistance = undefined;
	for (var i = 0; i < creeps.length; i++) {
		if (creeps[i] != undefined) {

			var _distance =	getDistance(towerIndex, i)

			if (creepDistance > _distance || creepDistance == undefined) {
				index = i;
				creepDistance = _distance; 
			};
		};
	};
	return index 	
};


function getDistance(towerIndex, creepIndex){ // FIND DISTANCE FROM TOWER TO CREEP

	if (towers[towerIndex] == undefined) {
		console.log("getDistance aborted early due to undefined tower Object")
		console.log("towerIndex = " + towerIndex)
		return 
	};

	if (creeps[creepIndex] == undefined) {
		console.log("getDistance aborted early due to undefined creep Object")
		console.log("creepIndex = " + creepIndex)
		return 
	};

	var distanceX = creeps[creepIndex].posX - towers[towerIndex].posX 
	var distanceY = creeps[creepIndex].posY - towers[towerIndex].posY 
	var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
	return distance 
};

function aimTower(i) {
	if (towers[i] != undefined && creeps[towers[i].targetCreep] != undefined){
		_target = towers[i].targetCreep
		var _distanceX = (creeps[_target].posX) - towers[i].posX;
		var _distanceY = ((creeps[_target].posY) - towers[i].posY ) * -1;
	 	var _direction = Math.atan2(_distanceX, _distanceY)
	 	return _direction
  }; 
};
