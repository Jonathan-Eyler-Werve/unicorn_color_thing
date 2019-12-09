//<!--  Contains functions to create, draw and modify towers -->

window.game = window.game || {};

var g = window.game;
g.towers = [];

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
	this.bornCycle = g.gameLoopCounter;
	this.explodeCycle = undefined;

	this.drawTower = drawTower;
	function drawTower(ctx){
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

// function wizard() {
// 		g.overlayCtx.save();
// 	  g.overlayCtx.translate(700, 700);
// 		g.overlayCtx.beginPath();
// 	  g.overlayCtx.arc(0, 0, 20, 0, 2 * Math.PI, false);
// 	  g.overlayCtx.fillStyle = '#999999';
// 	  g.overlayCtx.fill();
// 	  g.overlayCtx.restore();
// 	};

function smokeTrail(i) {
		g.overlayCtx.save();
	  g.overlayCtx.translate(g.towers[i].posX, g.towers[i].posY);
		g.overlayCtx.beginPath();
	  g.overlayCtx.arc(0, 0, 3, 0, 2 * Math.PI, false);
	  g.overlayCtx.globalAlpha = 0.3;
	  g.overlayCtx.fillStyle = 'green';
	  g.overlayCtx.fill();
	  g.overlayCtx.restore();
	};

// function drawDot(ctx){ // Draws a square dot on canvas
// 	ctx.beginPath();
//   ctx.lineWidth = 5
//   ctx.moveTo(0,0);
//   ctx.lineTo(0, 5);
//   ctx.stroke();
// };

function drawAllTowers(ctx){
	for (var i = 0; i < g.towers.length; i++) {
		if (g.towers[i] != undefined) {
      g.towers[i].drawTower(ctx);
    };
  };
};

function updateTowers(){

	if (countCollection(g.towers) < 90){
		var localX = to_i((Math.random() * window.innerWidth));
		var localY = to_i((Math.random() * window.innerHeight));
		createTower(localX,localY);
	};

	for (var i = 0; i < g.towers.length; i++) {
		if (g.towers[i] != undefined) {
			g.towers[i].targetCreep = findClosestTarget(i);
			g.towers[i].direction = aimTower(i);
			g.towers[i].apparentDirection = pointTowerImage(i);
			chaseTargets(i);
			smokeTrail(i);
			explode(i);
		};
	};
};

function createTower(x,y){
	if (g.gameLoopCounter % 100 == 1){
		// console.log("create Tower!")
		g.towers.push(new tower(x,y));
	}
};

function explode(i) {

	var splashSize = (Math.abs(g.towers[i].inertiaX) + Math.abs(g.towers[i].inertiaY)) * .3 + 5

	if (g.creeps[g.towers[i].targetCreep] == undefined) {
		return
	};

	var _distance = getDistance(i, g.towers[i].targetCreep);

	if ( (_distance < g.towers[i].towerRange) && (g.towers[i].explodeCycle == undefined) ) {
		g.towers[i].image.src = imgBang;
		g.towers[i].explodeCycle = g.gameLoopCounter;
		splatterSplash(g.towers[i].posX, g.towers[i].posY, seedColor, splashSize);
		hitCreep(i);
	};

	if ( g.towers[i].explodeCycle < g.gameLoopCounter - 10)  {
		g.towers[i] = undefined;
	};
};

function updateThrustX(i) {
	// console.log("direction " + g.towers[i].direction)
  return (g.towers[i].thrustPolar * Math.sin(g.towers[i].direction));
};

function updateThrustY(i) {
	// console.log(g.towers[i].direction)
  return (-1 * g.towers[i].thrustPolar * Math.cos(g.towers[i].direction));
};

function chaseTargets(i){
	g.towers[i].thrustPolar = 5; // hardcoded for now
	// console.log("tower " + i + ", thrustX = " + updateThrustX(i));
	g.towers[i].inertiaX = g.towers[i].inertiaX + updateThrustX(i);
	g.towers[i].inertiaY = g.towers[i].inertiaY + updateThrustY(i);
	// console.log("tower " + i + ", inertiaX = " + g.towers[i].inertiaX);
	g.towers[i].posX += g.towers[i].inertiaX;
	g.towers[i].posY += g.towers[i].inertiaY;
};

function findClosestTarget(towerIndex) { // finds nearest creep
	var creepDistance = undefined;
	for (var i = 0; i < g.creeps.length; i++) {
		if (g.creeps[i] != undefined) {
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

	if (g.towers[towerIndex] == undefined) {
		console.log("getDistance aborted early due to undefined tower Object")
		console.log("towerIndex = " + towerIndex)
		return
	};

	if (g.creeps[creepIndex] == undefined) {
		console.log("getDistance aborted early due to undefined creep Object")
		console.log("creepIndex = " + creepIndex)
		return
	};

	var distanceX = g.creeps[creepIndex].posX - g.towers[towerIndex].posX
	var distanceY = g.creeps[creepIndex].posY - g.towers[towerIndex].posY
	var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
	return distance
};

function aimTower(i) {
	if (g.towers[i] != undefined && g.creeps[g.towers[i].targetCreep] != undefined){
		_target = g.towers[i].targetCreep
		var _distanceX = (g.creeps[_target].posX) - g.towers[i].posX;
		var _distanceY = ((g.creeps[_target].posY) - g.towers[i].posY ) * -1;
	 	var _direction = Math.atan2(_distanceX, _distanceY)
	 	return _direction
  };
};

function pointTowerImage(i) {
	if (g.towers[i] != undefined && g.creeps[g.towers[i].targetCreep] != undefined){
		var _direction = Math.atan2(g.towers[i].inertiaX, g.towers[i].inertiaY)
	return _direction
	};
};
