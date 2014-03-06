//<!--  Contains functions to splatter stuff onto overlay based on game events -->
// 
	alert("splatters.js loads");

function splatterCircle(i, color, size) {

	console.log("splatterCircle called");
	overlayCtx.beginPath();
  overlayCtx.arc(towers[i].posX, towers[i].posY, size, 0, 2 * Math.PI, false);
  overlayCtx.fillStyle = color;
  overlayCtx.fill();

};