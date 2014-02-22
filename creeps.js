<!--  Contains functions to create, draw and modify creeps -->

function creep(posX,posY,direction,hitPoints){
	this.posX=posX;
	this.posY=posY;
	this.direction=direction;
	this.hitPoints=hitPoints;
	this.image = new Image();
	this.image.src = 'images/icon_27452.svg';

	this.drawCreep=drawCreep;
	function drawCreep(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(to_rad(this.direction));
		ctx.drawImage(this.image,-25,-25);
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

function updateCreeps(){
	for (var i = 0; i < creeps.length; i++) {
	    creeps[i].direction = creeps[i].direction + 1
	    console.log(creeps[i].direction)
	};
};

var creeps = [];
var my_creep = new creep(100,100,180,10);
creeps.push(my_creep)

console.log(my_creep);
console.log(creeps);

console.log(creeps[0].direction)