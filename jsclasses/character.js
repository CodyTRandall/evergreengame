function Character(id,name,playerclass,xp,level,gold,health,maxhealth,mana,maxmana,str,def,wisdom,speed,intel,strmod,defmod,wisdommod,speedmod,intelmod,x,y,z,classname,maxitems,weapon,weapon2,head,chest,legs,feet,hands,neck,ring1,ring2){
	this.id = id;
	this.name = name;
	this.playerclass = playerclass;
	this.level = level;
	this.xp = xp;
	this.gold = gold;
	this.health = health;
	this.maxhealth = maxhealth;
	this.mana = mana;
	this.maxmana = maxmana;
	this.str = str;
	this.def = def;
	this.wisdom = wisdom;
	this.speed = speed;
	this.intel = intel;
	this.strmod = strmod;
	this.defmod = defmod;
	this.wisdommod = wisdommod;
	this.speedmod = speedmod;
	this.intelmod = intelmod;
	this.x = x;
	this.y = y;
	this.z = z;
	this.classname=classname;
	this.maxitems = maxitems;
	//Equipment
	this.weapon = weapon;
	this.weapon2 = weapon2;
	this.head = head;
	this.chest = chest;
	this.legs = legs;
	this.feet = feet;
	this.hands = hands;
	this.neck = neck;
	this.ring1 = ring1;
	this.ring2 = ring2;
}