# How to make a tower defense game

##Objects 

###Make towers 

Towers have: 
* damage type
* rest period 
* damage quanta 
* range
* directionOfAim 

Towers do: 
* aim
* fire 
* rest 

###Make creeps
Creeps have: 
* Hitpoints
* Speed
* Special ability(s) (armor, spells)
* Intellegence (for route finding, evasion?)

Creeps do: 
* walk
* routeFind
* getHit
* die

###Make bullets
Bullets allow for dynamic damage based on splash and random flight paths.

Bullets have:
* direction
* speed 
* position 
* size? 

###Make terrain
Terrain has route logic embedded in it. Terrain has tower locations. Walls. Walk speed multipliers. 

## Process to MVP 
### Make terrain. 
Keep it simple. 
### Make a tower 
Set abitrarily. Attibutes hard coded. 
* Tower can fire.

### Make a bullet
Keep it simple. 

### Make a creep
* Creep can walk. // DONE! 
* Creep can get hit. // DONE!
* Creep can die. 
