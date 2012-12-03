/****************************
Cody Randall - Evergreen
www.playconquest.com
Character Selection
 ***************/

//Define canvas Variables
var width = 750,  height = 525, c = document.getElementById('c'), ctx = c.getContext('2d'),load = false,stage=0,imgnum=2,active=-1;

//Add the mouse listener to the canvas element
c.addEventListener("click", canvasOnClick, false);

//Set the canvas width/height.
c.width = width;
c.height = height;

/********
Load Images
*********/
//Background image
imgArray = new Array();
imgArray[0] = new Image();
imgArray[0].src = "bgimage/parchment.png";
//Character class images
classImg = new Array();
classImg[0] = new Image();
classImg[0].src = "classimage/champion.png";
classImg[2] = new Image();
classImg[2].src = "classimage/thief.png";
classImg[1] = new Image();
classImg[1].src = "classimage/wizard.png";
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
	//Stage 0 is Character Select
	if(stage==0){
		for (var count=0; count<total; count++){
			//Check if selecting a character to create
			if((x<200 && x>25) && (y>selectBoxY(count) && y<selectBoxY(count)+75)){
				if(typeof characters[count] != 'undefined'){
					stats[0] = characters[count].name;
					stats[1] = "Level "+characters[count].level+" "+characters[count].classname;
					imgnum = (characters[count].playerclass)-1;
					active = count;
				}else{
					stage=1;
				}
				break;
			}
		}
		//Check if selecting the enter server button
		if((x>250 && x<450 && y>350 && y<450) && active>-1){
			window.location.href='./login.php?id='+characters[active].id;
		}
	}
	//Stage one is new Character creation.
	if(stage==1){
		//If they select a class image
		for(var count=0; count<4; count++){
			if (x>calcNewCharacterClassX(count) && x<calcNewCharacterClassX(count)+200 && y>38 && y<238){
				classname = classlist[count].name;
				classdesc1 = classlist[count].desc1;
				classdesc2 = classlist[count].desc2;
				//Check if it is a double click, go to next page
				if(classlist[count].active){
					window.location.href='./newchar.php?id='+count;
				}
				for(var z=0; z<3; z++){
					classlist[z].active = false;
				}
				classlist[count].active = true;
			}
		}
	}
}

/*******
Draw Functions
********/
var clear = function(){
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = '4';
	ctx.beginPath();
	ctx.drawImage(imgArray[0], 0, 0);
	ctx.strokeRect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
var stats = new Array();

/*******
Char Select
*******/
var selectBoxY = function(counter){
	return 25+counter*100;
}
var drawCharacterSelect = function(){
	var count;
	ctx.beginPath();
	ctx.font = "16pt Helvetica";
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = '4';
	ctx.fillStyle = '#000000';
	ctx.moveTo(225,0);
	ctx.lineTo(225,height);
	for(count = 0; count<total; count++){
		//ctx.strokeRect(25, selectBoxY(count), 175, 75);
		if(typeof characters[count] != 'undefined'){
			ctx.fillText(characters[count].name, 40, selectBoxY(count)+40, 165);
		}else{
			ctx.fillText("New Character", 40, selectBoxY(count)+40, 165);
		}
	}
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}
var statTextY = function(counter){
	return 75+counter*50;
}
var drawCharacterText = function(){
	if(typeof stats[0] != 'undefined'){
	ctx.beginPath();
	ctx.drawImage(classImg[imgnum],500,75);
	ctx.fillStyle = '#000000';
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = '1';
	ctx.font = "16pt Helvetica";
	for(var count=0; count<stats.length; count++){
		ctx.fillText(stats[count], 250, statTextY(count));
		ctx.font = "14pt Helvetica";
	}
	ctx.font = "24pt Helvetica";
	ctx.fillText("Enter Server", 250,400);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	}
}
/********
New Character
*********/
var calcNewCharacterClassX = function(count){
	return 38+(count*200)+count*38;
}
var drawNewCharacterClass = function(){
	for(var count=0; count<3; count++){
		ctx.drawImage(classImg[count], calcNewCharacterClassX(count), 40);
		ctx.strokeStyle = '#000000';
		if(classlist[count].active){
			ctx.strokeStyle = '#ffffff';
		}
		ctx.lineWidth = '3';
		ctx.strokeRect(calcNewCharacterClassX(count), 40, 200, 350);
	}
	ctx.fillStyle = '#000000';
	ctx.font = "18pt Helvetica";
	ctx.fillText(classname, 50, 448);
	ctx.font = "14pt Helvetica";
	ctx.fillText(classdesc1, 276, 440);
	ctx.fillText(classdesc2, 276, 458);
}
//Define the game loop
var GameLoop = function(){
	clear();
	if(stage==0){
		drawCharacterSelect();
		drawCharacterText();
	}
	if(stage==1){
		drawNewCharacterClass();
	}
	gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();	