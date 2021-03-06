var keystone     = require('keystone');
var middleware   = require('./middleware');
var importRoutes = keystone.importer(__dirname);

/**
 * Common Middleware
 */
keystone.pre('routes', middleware.initLocals);

/**
 * Import Route Controllers
 */
var routes = {
	controllers: importRoutes('../controllers'),
  api: importRoutes('../api')
};

/**
 * Setup Route Bindings
 */
exports = module.exports = function(app) {
	
  // views
	app.get('/', routes.controllers.home);
  app.get('/project/:id', routes.controllers.project);
	app.get('/about', routes.controllers.about);

  // api
  app.get('/api/posts', keystone.middleware.api, routes.api.posts.getPosts);
  app.get('/api/post/:slug', keystone.middleware.api, routes.api.posts.getPost);
	
};
