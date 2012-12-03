function Item(id,slot,masterid,name,str,def,intel,wisdom,speed,minlvl,img,playerclass,type,attack,armor,effect,buyprice,amt,health,mana){
	this.id = id;
	this.slot = slot;
	this.masterid = masterid;
	this.name = name;
	this.playerclass = playerclass;
	this.minlvl = minlvl;
	this.img = img;
	this.buyprice = buyprice;
	this.health = health;
	this.mana = mana;
	this.str = str;
	this.def = def;
	this.wisdom = wisdom;
	this.speed = speed;
	this.intel = intel;
	this.type = type;
	this.attack = attack;
	this.armor = armor;
	this.effect = effect;
	this.amt = amt;
	this.active = false;
}