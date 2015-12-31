import Happens from 'happens';
import $       from 'jquery';

const Navigation = {

	originalState: window.location.pathname.split('/').pop() || '/',
	url: null,

};

Navigation.init = function init() {

	Happens(this);

	this.bind();

};

Navigation.bind = function bind() {

	$(window).bind('popstate', this.popState.bind(this));

};

Navigation.go = function go(url) {

	if (this.url === url) return;

	this.pushState(url);

};

Navigation.pushState = function pushState(url) {

	this.url = url;

	history.pushState(this.url, null, this.url);

	this.emit('url:changed', this.url, this.getID());

};

Navigation.popState = function popState(event) {

	this.url = event.originalEvent.state || this.originalState;

	this.emit('url:changed', this.url, this.getID());

};

Navigation.getID = function getID() {

	if (this.url === '/') {

		return 'home';

	} else if (this.url === '/about') {

		return 'about';

	} else {
		
		return 'project';

	}

};

Navigation.init();

export default Navigation;
