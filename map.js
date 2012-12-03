/****************************
Cody Randall - Evergreen
www.playconquest.com
Map
DEFINED: mapTiles, an array of map tiles.
defaulttile, the id of the default tile.
 ***************/

//Define canvas Variables
var width = 750,  height = 525, c = document.getElementById('c'), ctx = c.getContext('2d');

//Add the mouse listener to the canvas element
c.addEventListener("click", canvasOnClick, false);

//Set the canvas width/height.
c.width = width;
c.height = height;

/********
Load Images
*********/
tileArray = new Array();
var defaultImg;
var loadImages = function(){
	defaultImg = new Image();
	defaultImg.src = "tiles/"+defaulttile+".png";
	for(var count=0; count<mapTiles.length; count++){
		//If the type has not been loaded before
		if(typeof tileArray[mapTiles[count].id] == 'undefined'){
			tileArray[mapTiles[count].id] = new Image();
			tileArray[mapTiles[count].id].src = "tiles/"+mapTiles[count].id+".png";
		}
	}
}
loadImages();
/*******
Event Functions
*********/
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;
    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)
    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function canvasOnClick(e){
	var x,y;
	var coords = c.relMouseCoords(e);
	x = coords.x;
	y = coords.y;
	//Determine what is being clicked on

}

/*******
Draw Functions
********/
var clear = function(){
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = '4';
	ctx.beginPath();
	ctx.fillRect(0,0,width,height);
	ctx.strokeRect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

var drawDefaultTile = function(){
	for(var x=0; x<21; x++){
		for(var y=0; y<16; y++){
			ctx.drawImage(defaultImg, x*32, y*32);
		}
	}
}

var drawTiles = function(){
}

//Define the game loop
var GameLoop = function(){
	clear();
	drawDefaultTile();
	drawTiles();
	gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();	