import Happens  from 'happens';
import TweenMax from 'gsap';
import $        from 'jquery';

const Navigation = {

	$el: $('#main'),
	popEventListnerAdded: false,
	url: null,
	id: null,

};

Navigation.init = function init() {

	Happens(this);

};

Navigation.start = function start() {

	this.id = this.$el[0].children[0].id;

	this.emit('url:changed', this.id);

	this.bindEvents();

};

Navigation.bindEvents = function bindEvents() {

	$('body').find('a').on('click', this.navigate.bind(this));

};

Navigation.navigate = function navigate(event) {

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

};

Navigation.fadeOut = function fadeOut() {

	const params = {
		autoAlpha: 0,
		ease: Power1.easeOut,
		onComplete: () => { this.loadPage(); }
	};

	TweenMax.to(this.$el, 0.25, params);

};

Navigation.fadeIn = function fadeIn() {

	const params = {
		autoAlpha: 1,
		ease: Power1.easeInOut
	};

	TweenMax.to(this.$el, 0.25, params);

};

Navigation.loadPage = function loadPage() {

	this.$el.load(`${this.url} .page`, null, () => {

		this.emit('url:changed', this.id);
		
		this.fadeIn();

	});

};

Navigation.pushState = function pushState() {

	history.pushState(this.url, null, this.url);

};

Navigation.popState = function popState() {

	$(window).on('popstate', event => {

		const state = event.originalEvent.state;

		this.url = state;

		this.popEventListnerAdded = true;

		this.fadeOut();

	});

};

export default Navigation;
