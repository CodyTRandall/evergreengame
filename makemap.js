/****************************
Cody Randall - Evergreen
www.playconquest.com
Map Creator
DEFINED: mapTiles, an array of map tiles.
defaulttile, the id of the default tile.
 ***************/

//Define canvas Variables
var width = 750,  height = 525, c = document.getElementById('c'), ctx = c.getContext('2d'), active=0, status=0, status2=0;

//Add the mouse listener to the canvas element
c.addEventListener("click", canvasOnClick, false);

//Set the canvas width/height.
c.width = width;
c.height = height;

var totalTile=35, defaulttile=1, mapnum=1;
var mapTiles = new Array();
/********
Load Images
*********/
function mapTile(id,x,y,status,status2){
	this.x = x;
	this.y = y;
	this.id = id;
	this.status = status;
	this.status2 = status2;
}

tileArray = new Array();
var defaultImg;
var loadImages = function(){
	//Tiles
	defaultImg = new Image();
	defaultImg.src = "tiles/"+defaulttile+".png";
	for(var count=1; count<totalTile; count++){
		tileArray[count] = new Image();
		tileArray[count].src = "tiles/"+count+".png";
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
	
	for(var count=1; count<totalTile; count++){
		if((x>calcMenuX(count) && x<calcMenuX(count)+32) && (y>calcMenuY(count) && y<calcMenuY(count)+32)){
			active = count;
		}
	}
	if(active>0){
		if((x>2 && x<17*32+2 && y>2 && y<17*32+2)){
			mapTiles[mapTiles.length] = new mapTile(active,Math.floor((x-2)/32),Math.floor((y-2)/32),status,status2);
			updateText();
		}
	}
}

/*******
Draw Functions
********/
var updateText = function(){
	var str = "INSERT INTO map"+mapnum+"(tileid,x,y,status,status1) VALUES";
	for(var count=0; count<mapTiles.length; count++){
		str = str+"("+mapTiles[count].id+","+mapTiles[count].x+","+mapTiles[count].y+","+mapTiles[count].status+","+mapTiles[count].status2+"), ";
	}
	document.getElementById("gogo").value=str;
}
var clear = function(){
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0,0,width,height);
	ctx.fill();
}
var drawDefaultTile = function(){
	for(var x=0; x<17; x++){
		for(var y=0; y<17; y++){
			ctx.drawImage(defaultImg, (x*32)+2, (y*32)+2);
		}
	}
}
var calcMenuX = function(x){
	return 550+((x%4)*32);
}
var calcMenuY = function(x){
	return (20+Math.floor((x-1)/4)*32);
}
var drawTileMenu = function(){
	for(var x=1; x<totalTile; x++){
		ctx.drawImage(tileArray[x],calcMenuX(x),calcMenuY(x));
		if(x==active){
			ctx.strokeStyle = '#00ff00';
			ctx.strokeRect(calcMenuX(x),calcMenuY(x),32,32);
			ctx.stroke();
		}
	}
}

var drawTiles = function(){
	for(var count=0; count<mapTiles.length; count++){
		ctx.drawImage(tileArray[mapTiles[count].id], mapTiles[count].x*32+2, mapTiles[count].y*32+2);
	}
}

//Define the game loop
var GameLoop = function(){
	clear();
	drawTileMenu();
	drawDefaultTile();
	drawTiles();
	gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();	