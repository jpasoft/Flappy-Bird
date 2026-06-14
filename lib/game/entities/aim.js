ig.module('game.entities.aim').requires('impact.entity').defines(function() {
	EntityAim = ig.Entity.extend({
		size: {
			x: 64,
			y: 8
		},
		collides: ig.Entity.COLLIDES.LITE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		name: "aim",
		gravityFactor: 0,
		disolve: 0,
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(100,50,150,0.5)',
		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
		}
	});
});