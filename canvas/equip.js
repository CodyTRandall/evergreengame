/****************************
Cody Randall - Evergreen
www.playconquest.com
Equip, draws the equip menu
 ***************/

var activeitem = -1;
var bgImg = new Array();
bgImg = new Image();
bgImg.src = "bgimage/parchment.png";
var itemImages = new Array();
function loadItemImages(){
	for(var count=0; count<items.length; count++){
		if(typeof itemImages[items[count].img] == 'undefined'){
			itemImages[items[count].img] = new Image();
			itemImages[items[count].img].src = "misc/items/"+items[count].img+".png";
		}
	}
}
loadItemImages();
function drawEquip(){
	drawEqBorders();
	drawEqItem();
	drawItems();
}

function drawEqBorders(){
	ctx.drawImage(bgImg,0,0);
	ctx.fillStyle = '#000000';
	ctx.fillRect(167,290,2,height);
	ctx.fillRect(0,290,546,2);
	ctx.fill();
}

function calcEqItemX(x){
	return 18+(x*45);
}
function calcEqItemY(y){
	return 298+(y*45);
}
function drawEqItem(){
	ctx.lineWidth = '2';
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#000000';
	var i = -1;
	for(var y=0; y<5; y++){
		for(var x=0; x<3; x++){
			if(!((x==0 && y==0) || (y==2 && x==0) || (y==0 && x==2) || (y==3 && x==0) || (y==3 && x==2))){
				//Increase the slot counter
				i++;
				//Create the whiterect
				ctx.fillRect(calcEqItemX(x), calcEqItemY(y),40,40);
				//iterate through items
				for(var z=0; z<items.length; z++){
					if(typeof items[z] != 'undefined'){
						if(items[z].slot == i){
							ctx.drawImage(itemImages[items[z].img],calcEqItemX(x),calcEqItemY(y));
						}
					}
				}
				ctx.strokeRect(calcEqItemX(x), calcEqItemY(y),40,40);
			}
		}
	}
}

function calcItemX(num){
	return 18+(num*45);
}
function calcItemY(y){
	return 18+(y*45);
}
function drawItems(){
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#000000';
	var num = 0;
	var y = -1;
	var count = 0;
	var go = true;
	for(var x=0; x<character.maxitems+count; x++){
		go = true;
		if(typeof items[x]!='undefined'){
			if(items[x].slot != -1){
				count++;
				go = false;
			}
		}
		if(go){
			num = x-count;
			if(num%11 == 0){
				y++;
			}
			num %= 11;
			ctx.fillRect(calcItemX(num), calcItemY(y) , 40, 40);
			if(typeof items[x]!= 'undefined'){
				ctx.drawImage(itemImages[items[x].img],calcItemX(num),calcItemY(y));
			}
			if(x == activeitem){
				ctx.strokeStyle = '#ffff00';
				ctx.strokeRect(calcItemX(num), calcItemY(y), 40,40);
				ctx.strokeStyle = '#000000';
			}else{
				ctx.strokeRect(calcItemX(num), calcItemY(y), 40,40);
			}
		}
	}
}
function checkEquipClick(xx,yy){
	//Check if clicking on inventory item
	var num = 0;
	var y = -1;
	var go = true;
	var count = 0;
	for(var x=0; x<character.maxitems+count; x++){
		go = true;
		if(typeof items[x]!='undefined'){
			if(items[x].slot != -1){
				count++;
				go = false;
			}
		}
		if(go){
			num = x-count;
			if(num%11 == 0){
				y++;
			}
			num %= 11;
			if(calcItemX(num)<xx && calcItemX(num)+40>xx && calcItemY(y)<yy && calcItemY(y)+40>yy){
				if(typeof items[x] == 'undefined'){
					activeitem = -1;
				}else{
					if(activeitem == x){
						eqItem(x);
						activeitem = -1;
					}else{
						activeitem = x;
					}
				}
				break;
			}
		}
	}
}

function inventorySize(){
	var itemslength = 0;
	for(var x=0; x<items.length; x++){
		if(typeof items[x]!= 'undefined'){
			itemslength++;
		}
	}
	return itemslength;
}

function eqItem(x){
	//Call php that tries to equip the item
	var ajaxRequest;
	try{ajaxRequest = new XMLHttpRequest();}catch (e){
		try{ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");}catch (e) {
			try{ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");}catch (e){
			}
		}
	}
	ajaxRequest.onreadystatechange = function(){
	}
	ajaxRequest.open("GET", "./xhrphp/equip.php?eid="+items[x].masterid, false);
	ajaxRequest.send(null);
	
	//Execute JS to equip the item on the screen
	var type = items[x].type;
	//Add the item
	var EqItem = getEquippedItem(type);
	if(EqItem>-1){
		addItem(items[EqItem].masterid);
	}
	//Unequip the current item
	unequip(type);
	//Add the new item with the slot
	addItemToSlot(x,type);
	//Remove 1 of the item from the items array
	removeItem(items[x].masterid);
}

//Add an item to the items array
function addItem(masterid){
	console.log(masterid);
	//adds an item to the items array which is given from something
	for(var x=0; x<items.length; x++){
		if(typeof items[x]!='undefined'){
			//If this item already exists and it is not equipped
			if(items[x].masterid == masterid && items[x].slot==-1){
				//Increase the amt
				console.log("Increasing item "+x);
				items[x].amt = items[x].amt+1;
				return true;
			}
		}
	}
	if(inventorySize() == character.maxitems){
		return false;
	}
	//Check to see if the item exists and is equipped, if so duplicate the stats
	for(var x=0; x<items.length; x++){
		if(typeof items[x]!='undefined'){
			if(items[x].masterid == masterid && items[x].slot>0){
				duplicateItem(x,-1);
					return true;
			}
		}
	}

	/*var ajaxRequest;
	try{ajaxRequest = new XMLHttpRequest();}catch (e){
		try{ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");}catch (e) {
			try{ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");}catch (e){}
		}
	}
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			items.push(ajaxRequest.responseText);
		}
	}
	ajaxRequest.open("GET", "./xhrphp/itemstats.php?mid="+masterid, false);
	ajaxRequest.send(null);*/
}

function addItemToSlot(x,slot){
	//Duplicate the item given the current item
	duplicateItem(x,slot);
}

function duplicateItem(x,slot){
	items.push(new Item(items[x].id,slot,items[x].masterid,items[x].name,items[x].str,items[x].def,items[x].intel,items[x].wisdom,items[x].speed,items[x].minlvl,items[x].img,items[x].playerclass,items[x].type,items[x].attack,items[x].armor,items[x].effect,items[x].buyprice,1,items[x].health,items[x].mana));
}

//Removes an item and returns the items aray.
function removeItem(masterid){
	for(var x=0; x<items.length; x++){
		if(typeof items[x]!='undefined'){
			if(items[x].masterid == masterid && items[x].slot == -1){
				if(items[x].amt>1){
					items[x].amt = items[x].amt-1;
				}else{
					items.splice(x,1);
				}
			}
		}
	}
}
	
//Returns an item id that is equipped in the current slot
function getEquippedItem(type){
	for(var x=0; x<items.length; x++){
		if(typeof items[x]!='undefined'){
			if(items[x].type == type && items[x].slot == type){
				return x;
			}
		}
	}
	return -1;
}

//Display the stats
function showStats(){

}

function unequip(type){
	var equippedItem = getEquippedItem(type);
	//Nothing equipped
	if(equippedItem == -1){
		return -1;
	}
	//Delete the equipped item
	for(var x=0; x<items.length; x++){
		if(typeof items[x]!='undefined'){
			if(items[x].slot == type){
				var returnValue = items[x].masterid;
				items.splice(x,1);
				return returnValue;
			}
		}
	}
}
