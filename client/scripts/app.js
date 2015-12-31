import HomeView   from 'app/views/home';
import RenderView from 'app/utils/view';

const App = {

  init: function init() {

    HomeView.init();
    RenderView.init();

  },

};

App.init();

window.APP = App;
