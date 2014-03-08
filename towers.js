//<!--  Contains functions to create, draw and modify towers -->
// 

var towers = [];  

function tower(posX,posY){
	this.posX = posX;
	this.posY = posY;
	this.direction = 0;
	this.apparentDirection = 0;
	this.directionSetting = 0;
	this.thrustPolar = 0;
	this.thrustX = 0;
	this.thrustY = 0;
	this.inertiaX = 10;
	this.inertiaY = -10;	
	this.size = 10;
	this.image = new Image();
	this.image.src = imgRoundArrow;
	this.image.height = 10;
  this.image.width = 10;
	this.randomShort = 5;
	this.randomMedium = 5;
	this.randomLong = 5;
	this.targetCreep = 0;
	this.towerRange = 20; // this could be an arguement
	this.bornCycle = gameLoopCounter;
	this.explodeCycle = undefined;

	this.drawTower = drawTower;

	function drawTower(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(this.direction);

	  if (this.explodeCycle == undefined){
	  	ctx.drawImage(this.image,-5,-5, 10, 10);
	  	// drawDot(ctx); 
	  }
	  else {
    	ctx.drawImage(this.image,-50,-50); // SVG 
	  };

	  ctx.restore();
	};

};

function wizard() {

		overlayCtx.save();
	  overlayCtx.translate(700, 700);
		overlayCtx.beginPath();
	  overlayCtx.arc(0, 0, 20, 0, 2 * Math.PI, false);
	  overlayCtx.fillStyle = '#999999';
	  overlayCtx.fill();
	  overlayCtx.restore();
	}; 

function smokeTrail(i) {

		overlayCtx.save();
	  overlayCtx.translate(towers[i].posX, towers[i].posY);
		overlayCtx.beginPath();
	  overlayCtx.arc(0, 0, 3, 0, 2 * Math.PI, false);
	  overlayCtx.globalAlpha = 0.3;
	  overlayCtx.fillStyle = 'yellow';
	  overlayCtx.fill();
	  overlayCtx.restore();
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
	createTower(0,0);
	createTower(700,700);

	for (var i = 0; i < towers.length; i++) {
		if (towers[i] != undefined) {
			towers[i].targetCreep = findClosestTarget(i);
			towers[i].direction = aimTower(i);
			towers[i].apparentDirection = pointTowerImage(i);
			chaseTargets(i);
			smokeTrail(i);
			explode(i);

		};

	};
};

function createTower(x,y){
	if (gameLoopCounter % 70 == 1){
		console.log("create Tower!")
		towers.push(new tower(x,y));
	} 	
};


function explode(i) {

	var splashSize = (towers[i].inertiaX + towers[i].inertiaY) * .3 + 20 
	//var splashSize = (Math.random() * 20 + 10)

	if (creeps[towers[i].targetCreep] == undefined) {
		return
	};

	var _distance = getDistance(i, towers[i].targetCreep);
	
	if ( (_distance < towers[i].towerRange) && (towers[i].explodeCycle == undefined) ) {		
		towers[i].image.src = imgBang;
		towers[i].explodeCycle = gameLoopCounter;
		splatterSplash(towers[i].posX, towers[i].posY, seedColor, splashSize);
		hitCreep(i);
	};

	// if ( towers[i].bornCycle + 100 == ){};
	if ( towers[i].explodeCycle < gameLoopCounter - 10)  {		
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
	towers[i].thrustPolar = 5; // hardcoded for now

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

function pointTowerImage(i) {
	if (towers[i] != undefined && creeps[towers[i].targetCreep] != undefined){
		var _direction = Math.atan2(towers[i].inertiaX, towers[i].inertiaY)
	return _direction
	};
};
