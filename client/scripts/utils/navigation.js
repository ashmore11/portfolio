import Happens  from 'happens';
import TweenMax from 'gsap';
import $        from 'jquery';

class Navigation {

	constructor() {

		Happens(this);

	}

	init() {

		this.popEventListnerAdded = false;

		this.$main = $('#main');

		this.id = this.$main[0].children[0].id;

		this.emit('url:changed', this.id);

		this.bindEvents();

	}

	bindEvents() {

		$('body').find('a').on('click', this.navigate.bind(this));

	}

	navigate(event) {

		event.preventDefault();

		const target = $(event.target);
		const url    = target.attr('href');

		if(url === '/keystone') {

			window.location = url;
			
			return;
		
		} else if(this.url !== url) {

			this.url = url;
			this.id  = target.text().toLowerCase();

		} else {
			
			return;

		}

		this.fadeOut();
		this.pushState();

		if(!this.popEventListnerAdded) {

			this.popState();

		}

	}

	fadeOut() {

		const params = {
			autoAlpha: 0,
			ease: Power1.easeOut,
			onComplete: () => { this.loadPage(); }
		};

		TweenMax.to(this.$main, 0.25, params);

	}

	fadeIn() {

		const params = {
			autoAlpha: 1,
			ease: Power1.easeInOut
		};

		TweenMax.to(this.$main, 0.25, params);

	}

	loadPage() {

		this.$main.load(`${this.url} .page`, null, () => {

			this.emit('url:changed', this.id);
			
			this.fadeIn();

		});

	}

	pushState() {

		history.pushState(this.url, null, this.url);

	}

	popState() {

		$(window).on('popstate', event => {

			const state = event.originalEvent.state;

			this.url = state;

			this.popEventListnerAdded = true;

			this.fadeOut();

		});

	}

}

export default Navigation;
