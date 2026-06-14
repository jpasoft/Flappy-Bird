ig.module('plugins.impact-infinite').requires('impact.system', 'impact.game').defines(function() {
	ig.InfiniteLevel = ig.Class.extend({
		levels: null,
		start: null,
		minwidth: 0,
		init: function(levels, start) {
			this.levels = levels;
			this.start = !start ? null : start;
			var allLevels = this.levels;
			if (this.start != null) {
				allLevels = allLevels.concat([this.start]);
			}
			var layerNames = [];
			for (var i = 0; i < allLevels.length; i++) {
				var level = allLevels[i];
				for (var j = 0; j < level.layer.length; j++) {
					var layer = level.layer[j];
					if (layerNames.indexOf(layer.name) === -1) {
						layerNames.push(layer.name);
					}
				}
			}
			var LevelGameData = JSON.parse(JSON.stringify(LevelStart));
			ig.game.loadLevel(LevelGameData);
			for (var i = 0; i < layerNames.length; i++) {
				var map = this.getMap(layerNames[i]);
				if (map === false) {
					var existingMap = ig.game.backgroundMaps[0],
						data = this.getEmptyMapData(existingMap.height, existingMap.width);
					var backgroundMap = new ig.BackgroundMap(existingMap.tilesize, data, existingMap.tilesetName);
					backgroundMap.anims = {};
					backgroundMap.repeat = false;
					backgroundMap.distance = existingMap.distance;
					backgroundMap.foreground = false;
					backgroundMap.preRender = false;
					backgroundMap.name = layerNames[i];
					ig.game.backgroundMaps.push(backgroundMap);
				}
			}
			ig.game.collisionMap.name = 'collision';
		},
		getMap: function(layerName) {
			for (var i = 0; i < ig.game.backgroundMaps.length; i++) {
				if (layerName === ig.game.backgroundMaps[i].name) {
					return ig.game.backgroundMaps[i];
				} else if (layerName === 'collision') {
					return ig.game.collisionMap;
				}
			}
			return false;
		},
		getEmptyMapData: function(height, width) {
			var data = [];
			for (var j = 0; j < height; j++) {
				var row = [];
				for (var k = 0; k < width; k++) {
					row.push(0);
				}
				data.push(row);
			}
			return data;
		},
		update: function() {
			if (ig.system.width < 10000) this.minWidth = 10000;
			else this.minWidth = ig.system.width;
			if (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.game.screen.x <= this.minWidth) {
				var nextLevel = this.getNextLevel();
				for (var i = 0; i < nextLevel.entities.length; i++) {
					var entity = nextLevel.entities[i];
					ig.game.spawnEntity(entity.type, entity.x + (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize), entity.y, entity.settings);
				}
				for (var i = 0; i < ig.game.backgroundMaps.length; i++) {
					this.extendMap(ig.game.backgroundMaps[i], nextLevel);
				}
				if (ig.game.collisionMap.data) {
					this.extendMap(ig.game.collisionMap, nextLevel);
				}
			}
		},
		getNextLevel: function() {
			var nextIdx = Math.floor(Math.random() * this.levels.length);
			return this.levels[nextIdx];
		},
		extendMap: function(map, level) {
			var layer = this.getLayer(map.name, level);
			if (!layer) {
				layer = {
					data: this.getEmptyMapData(level.layer[0].data.length, level.layer[0].data[0].length),
					width: level.layer[0].data[0].length
				};
			}
			var data = map.data;
			for (var j = 0; j < data.length; j++) {
				data[j].push.apply(data[j], layer.data[j]);
			}
			map.width += layer.width;
		},
		getLayer: function(layerName, level) {
			for (var i = 0; i < level.layer.length; i++) {
				if (layerName === level.layer[i].name) {
					return level.layer[i];
				}
			}
			return false;
		}
	});
}); 