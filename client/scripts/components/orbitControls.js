import $     from 'jquery';
import THREE from 'three';
import TWEEN from 'tween.js';

const OrbitControls = {
	
	$el: $('#three-viewport'),

	scene: null,
	camera: null,

	pivot: null,
	tween: null,
	
	pos: {
		a: 0,
		x: 0,
	},

	pivot: new THREE.Object3D(),

};

OrbitControls.init = function init(scene, camera) {

	this.scene  = scene;
	this.camera = camera;

	this.scene.add(this.pivot);
	this.pivot.add(this.camera);

	this.bind();

};

OrbitControls.bind = function bind() {

	this.$el.on('mousemove',  this.mouseMove.bind(this));
	this.$el.on('touchstart', this.touchStart.bind(this));
	this.$el.on('touchmove',  this.touchMove.bind(this));
	this.$el.on('touchend',   this.touchEnd.bind(this));

};

OrbitControls.unbind = function unbind() {

	this.$el.off('mousemove');
	this.$el.off('touchstart');
	this.$el.off('touchmove');
	this.$el.off('touchend');

};

OrbitControls.mouseMove = function mouseMove() {

	this.pos.x = event.pageX;
	this.pos.x = this.pos.x - $( window ).width() / 2;
	this.pos.x = this.pos.x * 0.000025;

};

OrbitControls.touchStart = function touchStart() {

	this.pos.a = event.originalEvent.touches[0].pageX;

};

OrbitControls.touchMove = function touchMove() {

	if(tween) { tween.stop(); }

	this.pos.x = event.originalEvent.touches[0].pageX;
	this.pos.x = this.pos.x - this.pos.a;
	this.pos.x = this.pos.x * -0.000075;

};

OrbitControls.touchEnd = function touchEnd() {

	const duration = Math.round(Math.abs(this.pos.x * 100000));
	const tween    = new TWEEN.Tween(this.pos);

	tween.to({ x: 0 }, duration);
	tween.easing(TWEEN.Easing.Sinusoidal.Out);
	tween.start();

};

OrbitControls.watchTarget = function watchTarget() {

	this.camera.lookAt(this.scene.position);

};

OrbitControls.update = function update() {
		
	this.pivot.rotation.y = this.pivot.rotation.y - this.pos.x;

	this.watchTarget();

};

export default OrbitControls;
