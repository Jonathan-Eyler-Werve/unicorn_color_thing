//<!--  Contains functions to splatter stuff onto overlay based on game events -->
// 

function splat(x, y, color, size) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.size = (size * Math.random()); 

};




function splatterSplash(x, y, color, size) {

	var splats = [];

	splatterCircle((x + 10), (y + 10), randomAnalogue(color), size);
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
	var _colors = tinycolor.analogous(color, results = 5, slices = 10)
	var _number = to_i((Math.random() * 6));
	return _colors[_number].toHexString();
};

function to_i(_value)  {
  // uses Bitwise operator to convert value to int. Allegedly faster than Math methods.
  return _value | 0
};

randomAnalog('green');
randomAnalog('green');
randomAnalog('green');
randomAnalog('green');
randomAnalog('green');
randomAnalog('green');
randomAnalog('green');
function to_rad(_degrees){
  return _degrees * (Math.PI / 180)
};
