class App extends App

	constructor: ->

		# Initialize the app when the DOM is ready
		angular.element( document ).ready () => do @start

		return [ 
			'firebase',
			'ngRoute',
			'ngAnimate',
			'ngSanitize',
			'imagesLoaded'
		]


	start: ->
			
		# Bootstrap Angular
		angular.bootstrap document, [ 'app' ]