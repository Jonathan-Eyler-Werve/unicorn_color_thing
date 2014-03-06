//<!--  Contains functions to splatter stuff onto overlay based on game events -->
// 

function splat(x, y, color, size) {
	this.xOrigin = x;
	this.yOrigin = y;
	this.colorOrigin = color;
	this.color = randomAnalogue(color);
	this.sizeOrigin = size;
	this.bounceDistance = Math.random() * size * 3; 
	this.bounceDirection = to_rad(Math.random() * 360);
	this.size = (size * Math.random() ); 
	this.x = this.xOrigin + (this.bounceDistance * Math.sin(this.bounceDirection));
	this.y = this.yOrigin + (-1 * this.bounceDistance * Math.cos(this.bounceDirection));

	splatterCircle(this.x, this.y, this.color, this.size);

};


function splatterSplash(x, y, color, size) {

	var splats = [];

	for (var i=0; i<30; i++ ) { 
		splats.push(new splat(x, y, color, size)) 
	}

};



function splatterCircle(x, y, color, size) {
	console.log("splatterCircle called");
	overlayCtx.beginPath();
  overlayCtx.arc(x, y, size, 0, 2 * Math.PI, false);
  overlayCtx.fillStyle = color;
  overlayCtx.fill();
};

function randomSaturate(color) {
	var _number = (Math.random() * 100) - 50;
	return tinycolor.saturate(color, _number).toHexString();
};

function randomAnalogue(color) {
	var _colors = tinycolor.analogous(color, results = 6, slices = 10)
	console.log(_colors);
	var _number = to_i((Math.random() * 6));
	console.log(_number);
	return _colors[_number].toHexString();
};

function to_i(_value)  {
  // uses Bitwise operator to convert value to integer. Allegedly faster than Math methods.
  return _value | 0
};

function to_rad(_degrees){
  return _degrees * (Math.PI / 180)
};
