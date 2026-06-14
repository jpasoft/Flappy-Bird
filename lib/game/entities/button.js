ig.module(
	'game.entities.button'
).requires(
	'impact.entity'
).defines(function() {
	//button class
	EntityButton = ig.Entity.extend({
		//sound: new ig.Sound('media/audio/button-click.*'),
		init: function(x, y, settings) {
			this.addAnim('released', 1, [0]);
			this.addAnim('pressed', 1, [1]);
			this.parent(x, y, settings);

		},
		inFocus: function() {
			return ((this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) && ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) && (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) && ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y));
		}
	});
	//start button
	EntityButtonStart = EntityButton.extend({
		size: {
			x: 120,
			y: 40
		},
		animSheet: new ig.AnimationSheet('media/button_start.png', 120, 40),
		update: function() {
			if (ig.input.pressed('click') && this.inFocus()) {
				this.currentAnim = this.anims['pressed'];
				//if (ig.Sound.enabled) this.sound.play();
			}
			if (ig.input.released('click') && this.inFocus()) {
				myGameMode = 1;
				ig.system.setGame(MyGame);
			}
			if (ig.input.released('click')) {
				this.currentAnim = this.anims['released'];
			}
		}
	});
});