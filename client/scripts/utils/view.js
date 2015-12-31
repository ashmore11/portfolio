import $           from 'jquery';
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

  Nav.on('url:changed', this.load.bind(this));

};

View.load = function load(url, id) {

  Request.get(url).then(response => {

    const parsedHtml = $.parseHTML(response);
    const html = $(parsedHtml.filter(item => { return item.id === 'main'; }));

    this.render(html, id);
  
  });

};

View.render = function render(html, id) {

  this.$el.html(html);

  if (this.view) this.view.destroy();

  this.view = this.views[id];

  this.view.init();

};

export default View;