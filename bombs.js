//<!--  Contains functions to create, draw and modify bombs -->
// 

var bomb = [];  

function bomb(posX,posY){
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
	this.bombRange = 20; // this could be an arguement
	this.bornCycle = gameLoopCounter;
	this.explodeCycle = undefined;

	this.drawBomb = drawBomb;
	function drawBomb(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(this.direction);

	  if (this.explodeCycle == undefined){
	  	ctx.drawImage(this.image,-5,-5, 10, 10);
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
	  overlayCtx.translate(bombs[i].posX, bombs[i].posY);
		overlayCtx.beginPath();
	  overlayCtx.arc(0, 0, 3, 0, 2 * Math.PI, false);
	  overlayCtx.globalAlpha = 0.3;
	  overlayCtx.fillStyle = 'yellow';
	  overlayCtx.fill();
	  overlayCtx.restore();
	}; 	

function drawDot(ctx){ // Draws a square dot on canvas
	ctx.beginPath();
  ctx.lineWidth = 5
  ctx.moveTo(0,0);
  ctx.lineTo(0, 5);
  ctx.stroke();
};

function drawAllBombs(ctx){
	for (var i = 0; i < bombs.length; i++) {
		if (bombs[i] != undefined) {
      bombs[i].drawBomb(ctx);
    };
  };
};

function updateBombs(){

	if (countCollection(bombs) < 20){ 
		createBomb(0,0);
		createBomb(700,700);
	};

	for (var i = 0; i < bombs.length; i++) {
		if (bombs[i] != undefined) {
			bombs[i].targetCreep = findClosestTarget(i);
			bombs[i].direction = aimBomb(i);
			bombs[i].apparentDirection = pointBombImage(i);
			chaseTargets(i);
			smokeTrail(i);
			explode(i);
		};
	};
};

function createBomb(x,y){
	if (gameLoopCounter % 70 == 1){
		console.log("create Bomb!")
		bombs.push(new bomb(x,y));
	} 	
};

function explode(i) {

	var splashSize = (Math.abs(bombs[i].inertiaX) + Math.abs(bombs[i].inertiaY)) * .3 + 5 
	//var splashSize = (Math.random() * 20 + 10)

	if (creeps[bombs[i].targetCreep] == undefined) {
		return
	};

	var _distance = getDistance(i, bombs[i].targetCreep);
	
	if ( (_distance < bombs[i].BombRange) && (bombs[i].explodeCycle == undefined) ) {		
		bombs[i].image.src = imgBang;
		bombs[i].explodeCycle = gameLoopCounter;
		splatterSplash(bombs[i].posX, bombs[i].posY, seedColor, splashSize);
		hitCreep(i);
	};

	if ( bombs[i].explodeCycle < gameLoopCounter - 10)  {		
		bombs[i] = undefined;
	};
};

function updateThrustX(i) {
	// console.log("direction " + bombs[i].direction)
  return (bombs[i].thrustPolar * Math.sin(bombs[i].direction));
}; 

function updateThrustY(i) {
	// console.log(bombs[i].direction)
  return (-1 * bombs[i].thrustPolar * Math.cos(bombs[i].direction));
};

function chaseTargets(i){
	bombs[i].thrustPolar = 5; // hardcoded for now
	// console.log("Bomb " + i + ", thrustX = " + updateThrustX(i));
	bombs[i].inertiaX = bombs[i].inertiaX + updateThrustX(i);
	bombs[i].inertiaY = bombs[i].inertiaY + updateThrustY(i);
	// console.log("Bomb " + i + ", inertiaX = " + bombs[i].inertiaX);
	bombs[i].posX += bombs[i].inertiaX;
	bombs[i].posY += bombs[i].inertiaY;
}; 

function findClosestTarget(bombIndex) { // finds nearest creep 
	var creepDistance = undefined;
	for (var i = 0; i < creeps.length; i++) {
		if (creeps[i] != undefined) {
			var _distance =	getDistance(bombIndex, i)
			if (creepDistance > _distance || creepDistance == undefined) {
				index = i;
				creepDistance = _distance; 
			};
		};
	};
	return index 	
};

function getDistance(bombIndex, creepIndex){ // FIND DISTANCE FROM Bomb TO CREEP
	
	if (bombs[bombIndex] == undefined) {
		console.log("getDistance aborted early due to undefined Bomb Object")
		console.log("bombIndex = " + bombIndex)
		return 
	};

	if (creeps[creepIndex] == undefined) {
		console.log("getDistance aborted early due to undefined creep Object")
		console.log("creepIndex = " + creepIndex)
		return 
	};

	var distanceX = creeps[creepIndex].posX - bombs[bombIndex].posX 
	var distanceY = creeps[creepIndex].posY - bombs[bombIndex].posY 
	var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
	return distance 
};

function aimBomb(i) {
	if (bombs[i] != undefined && creeps[bombs[i].targetCreep] != undefined){
		_target = bombs[i].targetCreep
		var _distanceX = (creeps[_target].posX) - bombs[i].posX;
		var _distanceY = ((creeps[_target].posY) - bombs[i].posY ) * -1;
	 	var _direction = Math.atan2(_distanceX, _distanceY)
	 	return _direction
  }; 
};

function pointBombImage(i) {
	if (bombs[i] != undefined && creeps[bombs[i].targetCreep] != undefined){
		var _direction = Math.atan2(bombs[i].inertiaX, bombs[i].inertiaY)
	return _direction
	};
};
