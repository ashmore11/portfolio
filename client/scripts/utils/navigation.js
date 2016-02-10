const Navigation = {

  originalState: window.location.pathname,
  url: null,

  init: function init() {

    Happens(this);

    this.url = this.originalState;

    this.bind();

  },

  bind: function bind() {

    $(window).bind('popstate', this.popState.bind(this));

  },

  go: function go(url) {

    if (this.url === url) return;

    this.pushState(url);

  },

  pushState: function pushState(url) {

    this.url = url;

    history.pushState(this.url, null, this.url);

    this.emit('url:changed', this.url, this.getID());

  },

  popState: function popState(event) {

    this.url = event.originalEvent.state || this.originalState;

    this.emit('url:changed', this.url, this.getID());

  },

  getID: function getID() {

    if (this.url === '/') {

      return 'home';

    } else if (this.url === '/about') {

      return 'about';

    }

    return 'project';

  },

};

Navigation.init();

export default Navigation;
