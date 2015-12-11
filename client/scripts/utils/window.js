import $       from 'jquery';
import Happens from 'happens';

class Window {

	constructor() {

		Happens(this);

		this.window = $(window);
		this.width  = 0;
		this.height = 0;

		this.resize();
		this.bind();

	}

	bind() {

		this.window.on('resize', this.resize.bind(this));
		this.window.on('keydown', this.keydown.bind(this));

	}

	resize() {

		this.width  = this.window.width();
		this.height = this.window.height();

		this.emit('resize');

	}

	keydown(event) {

		const code = event.keyCode;
		let key    = null;

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

	}

}

export default new Window();
