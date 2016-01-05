import Nav         from 'app/utils/navigation';
import Transitions from 'app/utils/transitions';
import Request     from 'app/utils/request';
import HomeView    from 'app/views/home';
import ProjectView from 'app/views/project';
import AboutView   from 'app/views/about';

const View = {

  $el: $('#main'),
  view: null,
  views: {
    home: HomeView,
    project: ProjectView,
    about: AboutView,
  },

};

View.init = function init() {

  this.load(Nav.originalState, Nav.getID());

  this.bind();

};

View.bind = function bind() {

	Nav.on('url:changed', this.load.bind(this));

};

View.load = function load(url, id) {

  Request.get(url).then(response => {

  	let html;

    html = $.parseHTML(response);
    html = html.filter(item => { return item.id === 'main'; });

    Transitions.fadeOut(this.$el, 1, () => {

      this.render(html, id);

    });
  
  });

};

View.render = function render(html, id) {

  this.$el.html($(html).html());

  if (this.view) this.view.destroy();

  this.view = void 0;
  this.view = this.views[id];
  
  this.view.init();
  this.view.on('view:ready', () => {

  	Transitions.fadeIn(this.$el, 0.5);

  });

};

export default View;
