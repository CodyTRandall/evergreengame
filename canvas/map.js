/****************************
Cody Randall - Evergreen
www.playconquest.com
Map
DEFINED: mapTiles, an array of map tiles.
defaulttile, the id of the default tile.

Displays the character, the menu, and the tiles.
Also defines the width and height and the canavas for other pages.
 ***************/

//Define canvas Variables
var width = 750,  height = 525, c = document.getElementById('c'), ctx = c.getContext('2d'), state=0;

//Add the mouse listener to the canvas element
c.addEventListener("click", canvasOnClick, false);

//Set the canvas width/height.
c.width = width;
c.height = height;

/********
Load Images
*********/
//Menu icons
var menuArray = new Array();
menuArray[0] = new Image();
menuArray[0].src = "misc/menuequip.png";
menuArray[1] = new Image();
menuArray[1].src = "misc/menuquest.png";
menuArray[2] = new Image();
menuArray[2].src = "misc/menuskill.png";
menuArray[3] = new Image();
menuArray[3].src = "misc/menumap.png";
//Define image variables
tileArray = new Array();
characterArray = new Array();
mobArray = new Array();
var currentDir = 1;
var currentAnim = 1;
var defaultImg;
var rightMenu = new Image();
rightMenu.src = "misc/rightmenu.png";

//Load image function
var loadImages = function(){
	//Character
	for(var x=0; x<12; x++){
		characterArray[x] = new Image();
		characterArray[x].src = "characters/"+charclass+"/"+x+".png";
	}
	//Tiles
	defaultImg = new Image();
	defaultImg.src = "tiles/"+defaulttile+".png";
	for(var count=1; count<mapTiles.length; count++){
		//If the type has not been loaded before
		if(typeof tileArray[mapTiles[count].id] == 'undefined'){
			tileArray[mapTiles[count].id] = new Image();
			tileArray[mapTiles[count].id].src = "tiles/"+mapTiles[count].id+".png";
		}
	}
	
	for(var m=0; m<6; m++){
		mobArray[m] = new Image();
		mobArray[m].src = "monsters/"+m+".png";
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
	//alert(x+" "+y);
	//Check if you are selecting a menu item
	for(var i=0; i<menuArray.length; i++){
		if(x>560+(i*45) && x<560+i*45+40 && y>450 && y<490){
			if(i!=3){
				state = i+1;
			}else{
				state = 0;
			}
		}
	}
	if(state == 1){
		checkEquipClick(x,y);
	}
}

/*******
Draw Functions
********/
var clear = function(){
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0,0,width,height);
	ctx.fill();
}
var drawBorder = function(){
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = '4';
	ctx.strokeRect(0, 0, width-1, height);
	ctx.stroke();
}
var drawDefaultTile = function(){
	for(var x=0; x<17; x++){
		for(var y=0; y<17; y++){
			ctx.drawImage(defaultImg, (x*32)+2, (y*32)+2);
		} 
	}
}

var drawTiles = function(){
	for(var x=0; x<mapTiles.length; x++){
		ctx.drawImage(tileArray[mapTiles[x].id], (mapTiles[x].x)*32+2, (mapTiles[x].y)*32+2);
	}
}
var drawPlayer = function(){
	ctx.drawImage(characterArray[currentAnim+(currentDir-1)*3],charX*32+2,charY*32+2);
}
var drawMonsters = function(){
	var x=0;
	while(typeof mobs[x] != 'undefined'){
		ctx.drawImage(mobArray[mobs[x].img], (mobs[x].x)*32+2, (mobs[x].y)*32+2);
		x++;
	}
}
/*********
Menu Draw
**********/
function xpToLevel(level){
	return Math.floor(Math.pow(level+1,1.5)*1000);
}
var drawMenu = function(){
	//Menu Image
	ctx.drawImage(rightMenu,546,2);
	//Calculate hp and mana %
	var hpPerc = (character.health/character.maxhealth)*100;
	var manaPerc = (character.mana/character.maxmana)*100;
	var xpPerc = (character.xp/xpToLevel(character.level))*100;
	//Name, Health and Mana and level and gold
	ctx.fillStyle = '#ffffff';
	ctx.font = "14pt Helvetica";
	ctx.fillText(character.name,580,30);
	ctx.font = "12pt Helvetica";
	ctx.fillText("HP:", 580, 50);
	ctx.fillText("MN:", 580, 70);
	ctx.fillText("XP: ", 580, 90);
	ctx.fillText("Lvl: "+character.level+"          G:"+character.gold, 580, 110);
	//Draw the hp,mana,xp rects
	ctx.fillStyle = '#ff0000';
	ctx.lineWidth = '2';
	ctx.strokeStyle = '#ff0000';
	ctx.strokeRect(615,40,100,10);
	ctx.fillRect(615,40,hpPerc,10);
	ctx.strokeStyle = '#0000ff';
	ctx.fillStyle = '#0000ff'; 
	ctx.fillRect(615,60,manaPerc,10);
	ctx.strokeStyle = '#ffff00';
	ctx.fillStyle = '#ffff00';
	ctx.strokeRect(615,80,100,10);
	ctx.fillRect(615,80,xpPerc,10);
	//Draw the menu images
	ctx.strokeStyle = '#000000';
	for(var x=0; x<menuArray.length; x++){
		ctx.strokeRect(560+(x*45), 450, 40,40);
		ctx.drawImage(menuArray[x],560+(x*45),450);
	}
	
}
/*********
Animations
*********/
var lastAnim = 2;
var animatePlayer = function(){	
	if(currentAnim == 2){
		lastAnim = currentAnim;
		currentAnim = 1;
	}else if(currentAnim == 0){
		lastAnim = currentAnim;
		currentAnim = 1;
	}else if(currentAnim == 1 && lastAnim == 2){
		lastAnim = currentAnim;
		currentAnim = 0;
	}else if(currentAnim == 1 && lastAnim == 0){
		lastAnim = currentAnim;
		currentAnim = 2;
	}else{
		lastAnim = 2;
		currentAnim = 1;
	}
	animPlayer = setTimeout(animatePlayer, 500);
}
animatePlayer();

/********
Player Movement
********/
function validMove(dir){
	var x = charX;
	var y = charY;
	//Up
	if(dir == 0){y--;}
	if(dir == 1){x++;}
	if(dir == 2){y++;}
	if(dir == 3){x--;}
	for(var i=0; i<mapTiles.length; i++){
		if(mapTiles[i].x==x && mapTiles[i].y==y && mapTiles[i].status>0){
			return false;
		}
	}
	return true;
}
		
function movePlayer(direction){
	var ajaxRequest;
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	}catch (e){
		// Internet Explorer
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
				// Browser does not support
			}
		}
	}
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			//The Return of the move2.php script
			if(ajaxRequest.responseText != ""){
				//Check if the return was a map change
				if(ajax.Request.responseText == "mapchange"){
					alert('a');
					window.location('./map.php');
				}else{
					state = 2;
				}
			}
		}
	}
	ajaxRequest.open("GET", "move2.php?d="+direction, false);
	ajaxRequest.send(null);
}

var go = true;
var lastDir = 1;
var nextMove = function(){
	go = true;
}
document.onkeydown = function(event) {
		//Get the keycode, check for different browsers
		var keyCode; 
		if(event == null){keyCode = window.event.keyCode;}else{keyCode = event.keyCode; }
		//Move Circles movement defined: 0=up, 1=right, 2=down, 3=left
		switch(keyCode){
		// left 
		case 65:
			currentDir = 2;
			if(currentDir == lastDir){
				if(validMove(3)){
					if(go){
						go = false;
						reset = setTimeout(nextMove, 750);
						movePlayer(3);
						charX--;
						charX = Math.max(0,charX);
					}
				}
			}else{
				lastDir = currentDir;
			}
		break; 
		// up 
		case 87:
			currentDir = 4;
			if(currentDir == lastDir){
				if(validMove(0)){
					if(go){
						go = false;
						reset = setTimeout(nextMove, 750);
						movePlayer(0);
						charY--;
						charY = Math.max(0,charY);
					}
				}	
			}else{
				lastDir = currentDir;
			}
		break; 
		// right 
		case 68:
			currentDir = 3;
			if(currentDir == lastDir){
				if(validMove(1)){
					if(go){
						go = false;
						reset = setTimeout(nextMove, 750);
						movePlayer(1);
						charX++;
						charX = Math.min(16,charX);
					}
				}
			}else{
				lastDir = currentDir;
			}
		break; 
		// down
		case 83:
			currentDir = 1;
			if(currentDir == lastDir){
				if(validMove(2)){
					if(go){
						go = false;
						reset = setTimeout(nextMove, 750);
						movePlayer(2);
						charY++;
						charY = Math.min(15,charY);
					}
				}
			}else{
				lastDir = currentDir;
			}
		break; 
		default: 
		break; 
		} 
}

//Define the game loop
var GameLoop = function(){
	clear();
	/*******
		STATES
			0 = Map
			1 = Equip
			2 = Combat
			Else = Blank.
	********/
	if(state == 0){
		drawDefaultTile();
		drawTiles();
		drawPlayer();
		drawMonsters();
	}
	if(state == 1){
		drawEquip();
	}
	drawMenu();
	drawBorder();
	
	gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();	