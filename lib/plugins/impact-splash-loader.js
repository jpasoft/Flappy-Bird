ig.module('plugins.impact-splash-loader').requires('impact.loader').defines(function() {
	ig.ImpactSplashLoader = ig.Loader.extend({
		endTime: 0,
		fadeToWhiteTime: 200,
		fadeToGameTime: 800,
		logoWidth: 340,
		logoHeight: 120,
		end: function() {
			this.parent();
			this.endTime = Date.now();
			ig.system.setDelegate(this);
		},
		run: function() {
			var t = Date.now() - this.endTime;
			var alpha = 1;
			if (t < this.fadeToWhiteTime) {
				this.draw();
				alpha = t.map(0, this.fadeToWhiteTime, 0, 1);
			} else if (t < this.fadeToGameTime) {
				ig.game.run();
				alpha = t.map(this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
			} else {
				ig.system.setDelegate(ig.game);
				return;
			}
			ig.system.context.fillStyle = 'rgba(0,0,0,' + alpha + ')';
			ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
		},
		draw: function() {
			this._drawStatus += (this.status - this._drawStatus) / 5;
			var ctx = ig.system.context;
			var w = ig.system.realWidth;
			var h = ig.system.realHeight;
			var scale = w / this.logoWidth / 3;
			var center = (w - this.logoWidth * scale) / 2;
			ctx.fillStyle = 'rgba(0,0,0,0.8)';
			ctx.fillRect(0, 0, w, h);
			ctx.translate(center, h / 2.5);
			ctx.scale(scale, scale);
			ctx.lineWidth = '1';
			ctx.strokeStyle = 'rgb(255,255,255)';
			ctx.strokeRect(0, ig.system.realHeight / 2, 480, 20);
			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillRect(0, ig.system.realHeight / 2, 100 * this._drawStatus, 10);
		}
	});
});﻿