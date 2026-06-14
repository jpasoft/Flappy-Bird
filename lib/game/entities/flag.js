 ig.module('game.entities.flag').requires('impact.entity').defines(function() {
 	EntityFlag = ig.Entity.extend({
 		size: {
 			x: 64,
 			y: 64
 		},
 		collides: ig.Entity.COLLIDES.NONE,
 		type: ig.Entity.TYPE.A,
 		checkAgainst: ig.Entity.TYPE.A,
 		name: "flag",
 		gravityFactor: 0,
 		zIndex: 10,
 		animSheet: new ig.AnimationSheet('media/flag.png', 64, 64),
 		init: function(x, y, settings) {
 			this.addAnim('idle', 15, [0]);
 			this.currentAnim = this.anims.idle;
 			this.parent(x, y, settings);
 		},
 		update: function() {
 			this.parent();
 		}
 	});
 });﻿