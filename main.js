var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {

/*    var tower = Game.getObjectById('eb7906a08198112b975b7c4b');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

*/

    for (var name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

//Harvester creation upto 3

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' });
        console.log('Spawning new harvester: ' + newName);
    }

//Upgraders creation upto 3 must be 3 or more harvesters

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);


    if (harvesters.length >= 3 && upgraders.length < 8 ){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, { role: 'upgrader' });
        console.log('Spawning new upgrader: ' + newName);
        
    }


//Builders creation up to 4 must be 3 or more harvesters.  Temp set to 4 for construction purposes.

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);


    if (harvesters.length >= 3 && builders.length < 3 ){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, { role: 'builder' });
        console.log('Spawning new builder: ' + newName);
        
    }

   
//Repairer creation up to 1 must be 3 or more harvesters

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);


    if (harvesters.length >= 3 && repairers.length < 1 ){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, { role: 'repairer' });
        console.log('Spawning new repairer: ' + newName);
        
    }
   
   

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
             
        if (creep.carry.energy == 0) {
            creep.memory.energystate = 'empty';
        }
        if (creep.carry.energy == creep.carryCapacity){
            creep.memory.energystate = 'full';
        }
        
        
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}


