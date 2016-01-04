const Window = {

	$el: $(window),
	width: 0,
	height: 0,

};

Window.init = function init() {

	Happens(this);

	this.resize();
	this.bind();

};

Window.bind = function bind() {

	this.$el.on('resize', this.resize.bind(this));
	this.$el.on('keydown', this.keydown.bind(this));

};

Window.resize = function resize() {

	this.width  = this.$el.width();
	this.height = this.$el.height();

	this.emit('resize');

};

Window.keydown = function keydown(event) {

	let key;

	if (event.keyCode === 38) key = 'up';
	if (event.keyCode === 40) key = 'down';
	if (event.keyCode === 37) key = 'left';
	if (event.keyCode === 39) key = 'right';

	this.emit('keydown', key);

};

Window.init();

export default Window;
