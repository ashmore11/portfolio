import $       from 'jquery';
import Happens from 'happens';

const Window = {

	window: $(window),
	width: 0,
	height: 0,

};

Window.init = function init() {

	Happens(this);

	this.resize();
	this.bind();

};

Window.bind = function bind() {

	this.window.on('resize', this.resize.bind(this));
	this.window.on('keydown', this.keydown.bind(this));

};

Window.resize = function resize() {

	this.width  = this.window.width();
	this.height = this.window.height();

	this.emit('resize');

};

Window.keydown = function keydown(event) {

	let key = null;

	switch(event.keyCode) {

		case 38:

			key = 'up';
		
			break;

		case 40:

			key = 'down';
		
			break;

		case 37:

			key = 'left';
		
			break;

		case 39:

			key = 'right';
		
			break;

	}

	this.emit('keydown', key);

};

Window.init();

export default Window;
