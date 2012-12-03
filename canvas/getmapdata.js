/*******
Get Map Data

INPUT is an array ofe data read from the text file /maps/id.txt

File Structure:
defaulttileid,tile1,x,y,status,status2,tile2,x,y,status,status2

Status is what type of tile it is, status2 is the property for that tile.

Statues:
0 - walkable, status 0 is under, 1 on top 
1 - not walkable
2 - teleport, status2 is coords for teleport x;y;z,
3 - town, status2 is townid
4 - mining, status2 is mineralid
*************/

var mapTiles = new Array();
var defaulttile;

//Map Tile class
function mapTile(id,x,y,status,status2){
	this.x = x;
	this.y = y;
	this.id = id;
	this.status = status;
	this.status2 = status2;
}

//mimics php explode() function
function explodeArray(item,delimiter) { 
	var tempArray= new Array(); 
	var Count=0; 
	var tempString=new String(item);
	while (tempString.indexOf(delimiter)>0) { 
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter)); 
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1); 
		Count=Count+1 
	}
	tempArray[Count]=tempString; 
	return tempArray; 
}

//updates the map data to a new map
function changeMap(data){
	//Clear the maptiles data
	var count=0,multi;
	var mapArray = explodeArray(""+data,",");
	defaulttile = mapArray[0];
	for(var x=1; x<(mapArray.length/5); x++){
		multi = (x-1)*5;
		mapTiles[count] = new mapTile(mapArray[multi+1], mapArray[multi+2], mapArray[multi+3], ""+mapArray[multi+4], ""+mapArray[multi+5]);
		count++;
	}

}