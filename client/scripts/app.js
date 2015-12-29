import Navigation  from 'app/utils/navigation';
import HomeView    from 'app/views/home';
import AboutView   from 'app/views/about';

const App = {

	views: {
		home    : HomeView,
		example : AboutView,
	},

	init: function init() {

		Navigation.init();

		Navigation.on('url:changed', id => {
			
			if(this.view) {
				
				this.view.destroy();
				this.view = null;

			}

			this.renderView(id);

		});

		Navigation.start();

	},

	renderView: function renderView(id) {

		this.views[id].init();

	},

};

App.init();

window.APP = App;
