ig.module('game.levels.lev3').requires('impact.image', 'game.entities.gate', 'game.entities.aim').defines(function() {
	LevelLev3 = {
		"entities": [{
			"type": "EntityGate",
			"x": 128,
			"y": 64
		}, {
			"type": "EntityAim",
			"x": 96,
			"y": 184,
			"settings": {
				"size": {
					"x": 64,
					"y": 8
				}
			}
		}],
		"layer": [{
			"name": "new_layer_0",
			"width": 8,
			"height": 15,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/main_spritesheet.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0, 0, 0, 5, 6, 0, 0, 0],
				[0, 0, 0, 15, 16, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 3, 4, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 11, 12, 0, 0, 0],
				[21, 22, 21, 22, 21, 22, 21, 22]
			]
		}, {
			"name": "collision",
			"width": 8,
			"height": 15,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
				[1, 1, 1, 1, 1, 1, 1, 1]
			]
		}]
	};
	LevelLev3Resources = [new ig.Image('media/main_spritesheet.png')];
});