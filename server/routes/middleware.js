/**
 * Initialises the standard view locals
 * 
 * The included layout depends on the navLinks array to generate
 * the navigation in the header, you may wish to change this array
 * or replace it with your own templates / logic.
 */
exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home',    key: 'home', href: '/' },
		{ label: 'Example', key: 'home', href: '/example' }
	];
	
	locals.user = req.user;
	
	next();
	
};

/**
 * Prevents people from accessing protected pages when they're not signed in.
 */
exports.requireUser = function(req, res, next) {
	
	if (!req.user) {

		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');

	} else {

		next();
		
	}
	
};

/**
 * Enable CORS.
 */
exports.allowCrossDomain = function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();

};
