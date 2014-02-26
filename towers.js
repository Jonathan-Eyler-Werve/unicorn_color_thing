//<!--  Contains functions to create, draw and modify towers -->

// Image paths

var imgRoundArrow = 'images/icon_5438.svg';

// 

function tower(posX,posY,type){
	this.posX=posX;
	this.posY=posY;
	this.direction= 0;
	this.hitPoints=hitPoints;
	this.size= 10;
	this.image = new Image();
	this.image.src = imgRoundArrow;
	this.randomShort = 5;
	this.randomMedium = 5;
	this.randomLong = 5;

	this.drawTower=drawTower;
	function drawCreep(ctx){
		ctx.save();
	  ctx.translate(this.posX, this.posY);
	  ctx.rotate(to_rad(this.direction));
		ctx.drawImage(this.image,-50,-50);
	  ctx.restore();
	};
};