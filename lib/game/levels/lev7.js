ig.module('game.levels.lev7').requires('impact.image', 'game.entities.gate', 'game.entities.aim').defines(function() {
	LevelLev7 = {
		"entities": [{
			"type": "EntityGate",
			"x": 128,
			"y": 192
		}, {
			"type": "EntityAim",
			"x": 96,
			"y": 312
		}],
		"layer": [{
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
				[0, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 0, 0, 0],
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
				[1, 1, 1, 1, 1, 1, 1, 1]
			]
		}, {
			"name": "new_layer_0",
			"width": 8,
			"height": 15,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/main_spritesheet.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 32,
			"foreground": false,
			"data": [
				[0, 0, 0, 5, 6, 0, 0, 0],
				[0, 0, 0, 5, 6, 0, 0, 0],
				[0, 0, 0, 5, 6, 0, 0, 0],
				[0, 0, 0, 5, 6, 0, 0, 0],
				[0, 0, 0, 5, 6, 0, 0, 0],
				[0, 0, 0, 15, 16, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 3, 4, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 1, 2, 0, 0, 0],
				[0, 0, 0, 11, 12, 0, 0, 0],
				[21, 22, 21, 22, 21, 22, 21, 22]
			]
		}]
	};
	LevelLev7Resources = [new ig.Image('media/main_spritesheet.png')];
});