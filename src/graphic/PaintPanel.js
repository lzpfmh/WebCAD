define(function (require) {
	var DrawableLayer = require('./DrawableLayer');
	var Cross = require('./drawables/Cross');

	function PaintPanel (holder) {
		this.holder = holder;
		this.storeLayer = new DrawableLayer(holder.querySelector('canvas.store'));
		this.volatileLayer = new DrawableLayer(holder.querySelector('canvas.volatile'));

		this.touchIndicatorDrawables = [];

		init(this);
	}

	function init (self) {
		self.holder.addEventListener('touchstart', function (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		}, true);
		drawCursorCross(self);
	}

	function drawCursorCross (self) {
		self.holder.addEventListener('touchmove', function (evt) {
			var tIndicators = self.touchIndicatorDrawables;
			for (var i = tIndicators.length - 1; i >= 0; i--) {
				self.volatileLayer.removeDrawable(tIndicators[i]);
			};
			self.touchIndicatorDrawables = [];
			var touches = evt.targetTouches;
			for (var i = touches.length - 1; i >= 0; i--) {
				var t = touches[i];
				var cross = new Cross(t.clientX, t.clientY);
				self.touchIndicatorDrawables.push(cross);
				self.volatileLayer.addDrawable(cross);
			};
			self.volatileLayer.repaint();
			//console.log(evt.targetTouches, evt.changedTouches.length);
		});
	}

	return PaintPanel;
});