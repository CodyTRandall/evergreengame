/****************************
Cody Randall - Evergreen
www.playconquest.com
Default Canvas Definition
 *********************/

//Define canvas Variables
var width = 750,  height = 525, c = document.getElementById('c'), ctx = c.getContext('2d'),load = false;

//Set the canvas width/height.
c.width = width;
c.height = height;

var clear = function(){
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#000000';
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.strokeRect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

//Define the game loop
var GameLoop = function(){
	clear();
	gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();	