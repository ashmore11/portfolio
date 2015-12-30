import Navigation  from 'app/utils/navigation';
import HomeView    from 'app/views/home';
import ProjectView from 'app/views/project';
import AboutView   from 'app/views/about';

const App = {

	views: {
		home    : HomeView,
		project : ProjectView,
		example : AboutView,
	},

	init: function init() {

		HomeView.init();

		Navigation.init();

		Navigation.on('url:changed', id => {
			
			if (this.view) {
				
				this.view.destroy();
				this.view = null;

			}

			this.renderView(id);

		});

	},

	renderView: function renderView(id) {

		this.views[id].init();

	},

};

App.init();

window.APP = App;
