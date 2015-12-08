import $     from 'jquery';
import THREE from 'three';
import TWEEN from 'tween.js';

export default class OrbitControls {

	constructor(scene, camera) {

		this.$el = $('#three-viewport');

		this.scene  = scene;
		this.camera = camera;

		this.pivot = null;
		this.tween = null;
		
		this.pos = {
			a: 0,
			x: 0
		};

		this.pivot = new THREE.Object3D();

		this.scene.add(this.pivot);
		this.pivot.add(this.camera);

		this.bind();

	}
	
	bind() {

		this.$el.on('mousemove',  this.mouseMove.bind(this));
		this.$el.on('touchstart', this.touchStart.bind(this));
		this.$el.on('touchmove',  this.touchMove.bind(this));
		this.$el.on('touchend',   this.touchEnd.bind(this));

	}

	unbind() {

		this.$el.off('mousemove');
		this.$el.off('touchstart');
		this.$el.off('touchmove');
		this.$el.off('touchend');

	}

	mouseMove() {

		this.pos.x = event.pageX;
		this.pos.x = this.pos.x - $( window ).width() / 2;
		this.pos.x = this.pos.x * 0.000025;

	}

	touchStart() {

		this.pos.a = event.originalEvent.touches[0].pageX;

	}

	touchMove() {

		if(tween) { tween.stop(); }

		this.pos.x = event.originalEvent.touches[0].pageX;
		this.pos.x = this.pos.x - this.pos.a;
		this.pos.x = this.pos.x * -0.000075;

	}

	touchEnd() {

		const duration = Math.round(Math.abs(this.pos.x * 100000));
		const tween    = new TWEEN.Tween(this.pos);

		tween.to({ x: 0 }, duration);
		tween.easing(TWEEN.Easing.Sinusoidal.Out);
		tween.start();

	}

	watchTarget() {

		this.camera.lookAt(this.scene.position);

	}

	update() {
			
		this.pivot.rotation.y = this.pivot.rotation.y - this.pos.x;

		this.watchTarget();

	}

}
