//<!--  Contains functions to splatter stuff onto overlay based on game events -->
// 





function splatterCircle(x, y, color, size) {

	console.log("splatterCircle called");
	overlayCtx.beginPath();
  overlayCtx.arc(x, y, size, 0, 2 * Math.PI, false);
  overlayCtx.fillStyle = color;
  overlayCtx.fill();

function randomSaturate(color) {
	var _number = (Math.random() * 100) - 50;
	return tinycolor.saturate(color, _number).toHexString();
};


};