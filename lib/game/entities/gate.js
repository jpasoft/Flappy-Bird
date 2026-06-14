ig.module('game.entities.gate').requires('impact.entity').defines(function() {
	EntityGate = ig.Entity.extend({
		size: {
			x: 1,
			y: 128
		},
		collides: ig.Entity.COLLIDES.LITE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		name: "gate",
		gravityFactor: 0,
		disolve: 0,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(200,50,75,0.5)',
		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
		}
	});
});﻿