ig.module('game.entities.bird').requires('impact.entity').defines(function() {
	EntityBird = ig.Entity.extend({
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
		name: 'bird',
		jump: 350,
		currentAngle: 0,
		locked: false,
		curTick: 0,
		curAim: null,
		gravityFactor: 0,
		curGate: null,
		score: 0,
		bestDistance: 0,
		leader: null,
		animSheet: new ig.AnimationSheet('media/bird.png', 50, 40),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('plane', 5, [1]);
			this.addAnim('plane2', 5, [4]);
			this.addAnim('flap', 0.05, [0, 1, 2, 1]);
			this.addAnim('flap2', 0.05, [3, 4, 5, 4]);
			this.maxVel.x = 15000;
			this.maxVel.y = 15000;
			this.currentAnim = this.anims.flap;
			this.startTimer = new ig.Timer(1.5);
		},
		check: function(other) {
			if (other.name == 'gate' && this.curGate == null || other.name == 'gate' && this.curGate != null && this.curGate != other && ig.game.gameOver == 0) {
				this.curGate = other;
				this.score++;
				ig.game.score++;
			}
		},
		handleMovementTrace: function(res) {
			if (res.collision.y || res.collision.x) {
				ig.game.gameOver = 1;
				if (this.bestDistance < this.pos.x) this.bestDistance = this.pos.x;
			}
			this.parent(res);
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
			if (ig.game.gameOver == 0) {
				if (this.startTimer != null && this.startTimer.delta() >= 0) {
					this.gravityFactor = 1;
				}
				if (this.pos.y <= 0) {
					this.pos.y = 0;
					this.vel.y = 0;
				}
				if (ig.input.pressed('click')) {
					this.gravityFactor = 1;
					this.vel.y = -this.jump;
				}
				if (this.vel.x < 150) {
					this.vel.x = 150;
				}
			} else {
				this.vel.x = 0;
				if (this.bestDistance < this.pos.x) ig.game.distance = Math.floor(this.pos.x);
				if (ig.input.pressed('click')) {
					this.curGate = null;
					this.leader = null;
					this.startTimer = new ig.Timer(1.5);
					this.score = 0, ig.game.score = 0, this.currentAnim.angle = 0;
					this.gravityFactor = 0;
					this.pos.x = 230;
					this.pos.y = 232;
					this.gravityFactor = 0;
					ig.game.gameOver = 0;
				}
			}
			this.parent();
		}
	});
});