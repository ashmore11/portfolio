/**
 * Simulate config options from your production environment by
 * customising the .env file in your project's root folder.
 */
require('dotenv').load();

/**
 * Require keystone
 */
var keystone = require('keystone');

keystone.set('cloudinary config', {
	cloud_name: 'ht82bpqvb',
	api_key: '714338449164971',
	api_secret: 'pMKHku1J_ccJEl-oiDGZfr6WVXU'
});

/**
 * Initialise Keystone with your project's configuration.
 * See http://keystonejs.com/guide/config for available options
 * and documentation.
 */
keystone.init({
	'cookie secret' : '.)1G(wwZgw"XLEx8(?/oP~4&k/u=}./~OeTmXnP40vSD|:~dmt7Fc#>k849QCk0['
	'mongo' : 'mongodb://dev.scottashmore@gmail.com:13-cheese-ass@ds039095.mongolab.com:39095/heroku_dgrvpr82'
	'name': 'Scott Ashmore - Portfolio',
	'brand': 'Scott Ashmore - Portfolio CMS',
	
	'stylus': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'client/templates/views',
	'view engine': 'jade',
	
	'updates': 'server/updates',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'
});

/**
 * Load your project's Models
 */
keystone.import('./server/models');

/**
 * Setup common locals for your templates. The following are required for the
 * bundled templates and layouts. Any runtime locals (that should be set uniquely
 * for each request) should be added to ./routes/middleware.js
 */
keystone.set('locals', {
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

/**
 * Load your project's Routes
 */
keystone.set('routes', require('./server/routes'));

/**
 * Configure the navigation bar in Keystone's Admin UI
 */
keystone.set('nav', {
	'pages': 'pages',
	'posts': 'posts',
	'tags' : 'tags',
	'users': 'users'
});

/**
 * Start Keystone to connect to your database and initialise the web server
 */
keystone.start();
