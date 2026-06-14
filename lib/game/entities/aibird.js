ig.module('game.entities.aibird').requires('impact.entity').defines(function() {
	EntityAibird = ig.Entity.extend({
		size: {
			x: 40,
			y: 28
		},
		offset: {
			x: 5,
			y: 10
		},
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		name: 'birdAI',
		jump: 350,
		currentAngle: 0,
		locked: false,
		curTick: 0,
		curAim: null,
		dead: false,
		score: 0,
		breaks: 1,
		animSheet: new ig.AnimationSheet('media/bird2.png', 50, 40),
		font: new ig.Font('media/sm_font.png'),
		curGate: null,
		bestDistance: 0,
		zIndex: -5,
		leader: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('plane', 5, [1]);
			this.addAnim('plane2', 5, [4]);
			this.addAnim('flap', 0.05, [0, 1, 2, 1]);
			this.addAnim('flap2', 0.05, [3, 4, 5, 4]);
			this.maxVel.x = 15000;
			this.maxVel.y = 15000;
			this.currentAnim = this.anims.flap;
			this.breaks = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
		},
		check: function(other) {
			if (other.name == 'gate' && this.curGate == null || other.name == 'gate' && this.curGate != null && this.curGate != other && this.dead == false) {
				this.curGate = other;
				this.score++;
			}
		},
		handleMovementTrace: function(res) {
			if (res.collision.y || res.collision.x) {
				this.dead = true;
				this.vel.x = 0;
			}
			this.parent(res);
		},
		selectAim: function() {
			var myEnt = ig.game.getEntitiesByType(EntityAim);
			var curDist = 1500;
			var curAim = null;
			for (var i = 0; i < myEnt.length; i++) {
				if (this.distanceTo(myEnt[i]) < curDist && (myEnt[i].pos.x + myEnt[i].size.x) + 10 > this.pos.x) {
					curAim = myEnt[i];
					curDist = this.distanceTo(myEnt[i]);
				}
			}
			this.curAim = curAim;
		},
		getRandomInt: function(max) {
			var zazor = this.getRandomReaction();
			return Math.floor(Math.random() * (max - zazor + 1)) + zazor;
		},
		getRandomReaction: function() {
			return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		},
		update: function() {
			if (this.leader != null) {
				if (this.vel.y < 0) {
					this.currentAnim = this.anims.flap2;
					this.currentAnim.angle = -0.45;
					this.currentAngle = this.currentAnim.angle;
				} else if (this.vel.y > 0) {
					this.locked = false;
					this.currentAnim = this.anims.plane2;
					this.currentAnim.angle = this.currentAngle;
					if (this.currentAnim.angle < 1.5) this.currentAnim.angle += 0.08;
					this.currentAngle = this.currentAnim.angle;
					this.vel.y += 10;
				}
			} else {
				if (this.vel.y < 0) {
					this.currentAnim = this.anims.flap;
					this.currentAnim.angle = -0.45;
					this.currentAngle = this.currentAnim.angle;
				} else if (this.vel.y > 0) {
					this.locked = false;
					this.currentAnim = this.anims.plane;
					this.currentAnim.angle = this.currentAngle;
					if (this.currentAnim.angle < 1.5) this.currentAnim.angle += 0.08;
					this.currentAngle = this.currentAnim.angle;
					this.vel.y += 10;
				}
			}
			if (this.dead == false) {
				this.selectAim();
				if (this.curAim != null) {
					this.gravityFactor = 1;
					var curDistance = this.distanceTo(this.curAim);
					var curAngle = this.angleTo(this.curAim);
					if (curAngle < 0.38 || curDistance <= 45 && curAngle < 2 || curDistance <= 46 && curAngle > 2.6 || curDistance <= 53 && curAngle > 2.8 || curDistance <= 49 && curAngle < 0.45 || 1.2 < curAngle > 2.25) {
						if (this.curTick >= this.breaks) {
							this.curTick = 0;
							this.vel.y = -this.jump;
						}
					}
				}
				this.curTick++;
				if (this.pos.y <= 0) {
					this.pos.y = 0;
					this.vel.y = 0;
				}
				if (this.vel.x < 150) {
					this.vel.x = 150;
				}
			} else {
				if (this.bestDistance < this.pos.x) this.bestDistance = Math.floor(this.pos.x);
				if (this.startTimer != null && this.startTimer.delta() >= -1) {
					if (this.leader == 1) {
						this.breaks = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
					} else {
						this.breaks = 1;
					}
					this.startTimer = null;
					this.curGate = null;
					this.dead = false;
					this.score = 0;
					this.currentAnim.angle = 0;
					this.gravityFactor = 0;
					this.pos.x = Math.floor(Math.random() * (350 - 100 + 1)) + 100;
					this.pos.y = Math.floor(Math.random() * (350 - 100 + 1)) + 100;
				} else if (this.startTimer == null) {
					this.startTimer = new ig.Timer(Math.floor(Math.random() * (7 - 0 + 1) + 1));
				}
			}
			this.parent();
		}
	});
});﻿