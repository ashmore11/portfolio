import Happens from 'happens';
import $       from 'jquery';

const Navigation = {

	originalState: window.location.pathname.split('/').pop() || '/',
	popped: false,
	url: null,
	id: null,

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
	this.id  = this.getID();

	history.pushState(this.url, null, this.url);

	this.emit('url:changed', this.id);

};

Navigation.popState = function popState(event) {

	this.url = event.originalEvent.state || this.originalState;
	this.id  = this.getID();

	this.emit('url:changed', this.id);

};

Navigation.getID = function getID() {

	if(this.url === '/') return 'home';
		
	return this.url.split('/').pop();

};

export default Navigation;
