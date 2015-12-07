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
	controllers: importRoutes('../controllers')
};

/**
 * Setup Route Bindings
 */
exports = module.exports = function(app) {
	
	app.get('/',        routes.controllers.home);
	app.get('/example', routes.controllers.example);
	
};
