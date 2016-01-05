import Win    from 'app/utils/window';
import Camera from 'app/components/camera';
import Scene  from 'app/components/scene';

const PivotControls = {
	
	$el: null,
	scene: null,
	pivot: null,
	tween: null,
	pos: {
		a: 0,
		x: 0,
	},
	pivot: new THREE.Object3D(),

};

PivotControls.init = function init() {

	this.$el = $('#three-viewport');

	Scene.obj.add(this.pivot);

	this.pivot.add(Camera.obj);

	this.bind();

};

PivotControls.bind = function bind() {

	this.$el.on('mousemove',  this.mouseMove.bind(this));
	this.$el.on('touchstart', this.touchStart.bind(this));
	this.$el.on('touchmove',  this.touchMove.bind(this));
	this.$el.on('touchend',   this.touchEnd.bind(this));

};

PivotControls.unbind = function unbind() {

	this.$el.off('mousemove');
	this.$el.off('touchstart');
	this.$el.off('touchmove');
	this.$el.off('touchend');

};

PivotControls.mouseMove = function mouseMove() {

	this.pos.x = event.pageX;
	this.pos.x = this.pos.x - Win.width / 2;
	this.pos.x = this.pos.x * 0.000025;

};

PivotControls.touchStart = function touchStart() {

	this.pos.a = event.originalEvent.touches[0].pageX;

};

PivotControls.touchMove = function touchMove() {

	this.pos.x = event.originalEvent.touches[0].pageX;
	this.pos.x = this.pos.x - this.pos.a;
	this.pos.x = this.pos.x * -0.000025;

};

PivotControls.touchEnd = function touchEnd() {

	const duration = Math.round(Math.abs(this.pos.x * 100000));

	TweenMax.to(this.pos, duration, { x: 0, easing: Sine.easeOut })

};

PivotControls.update = function update() {
		
	this.pivot.rotation.y = this.pivot.rotation.y - this.pos.x;

	Camera.obj.lookAt(Scene.obj.position);

};

export default PivotControls;
