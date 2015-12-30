import Happens     from 'happens';
import Transitions from 'app/utils/transitions';
import Request     from 'app/utils/request';
import $           from 'jquery';

const Navigation = {

	url: null,

};

Navigation.init = function init() {

	Happens(this);

	this.bind();

};

Navigation.bind = function bind() {

	$(window).on('popstate', this.popState.bind(this));

};

Navigation.go = function go(url) {

	if (this.url === url) return;

	this.url = url;

	this.pushState();

};

Navigation.pushState = function pushState() {

	console.log('pushstate');

	const stateObj = {
		url: this.url,
	}

	history.pushState(stateObj, null, this.url);

};

Navigation.popState = function popState(event) {

	console.log('popstate', event);

	// this.url = event.originalEvent.state;

	// this.emit('url:changed')

};

export default Navigation;
