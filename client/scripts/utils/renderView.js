import $           from 'jquery';
import Nav         from 'app/utils/navigation';
import Transitions from 'app/utils/transitions';
import Request     from 'app/utils/request';
import HomeView    from 'app/views/home';
import ProjectView from 'app/views/project';
import AboutView   from 'app/views/about';

const RenderView = {

  $el: $('#main'),
  id: null,
  html: null,
  view: null,
  views: {
    home: HomeView,
    project: ProjectView,
    about: AboutView,
  },

};

RenderView.init = function init() {

  Nav.on('url:changed', this.getView.bind(this));

};

RenderView.getView = function getView(path, id) {

  this.id = id;

  const url = `${window.location.origin}${path}`;

  Request.get(url).then(response => {

    const html = $.parseHTML(response);
    
    this.html = $(html.filter(item => { return item.id === 'main'; }))[0];

    this.render();
  
  });

};

RenderView.render = function render() {

  this.$el.html(this.html);

  if (this.view) this.view.destroy();

  this.view = this.views[this.id];

  this.view.init();

};

export default RenderView;