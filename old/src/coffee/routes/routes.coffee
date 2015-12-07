class Routes extends Config

	constructor: ( $locationProvider, $routeProvider ) ->

		$locationProvider.html5Mode true

		$routeProvider

			.when '/',
				templateUrl : 'templates/views/home.html'
				controller  : 'homeController'

			.when '/project/:id',
				templateUrl : 'templates/views/project.html'
				controller  : 'projectController'

			.when '/about-me',
				templateUrl : 'templates/views/about.html'
				controller  : 'aboutController'

			.otherwise
				templateUrl : 'templates/views/home.html'
				controller  : 'homeController'