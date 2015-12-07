class Home extends Controller

	constructor: ( @$scope, @$firebaseArray, @$location, @$rootScope ) ->

		@$scope.page       = 'home'
		@$scope.controller = @

		do @handle_data


	handle_data: ->

		url  = 'https://scorching-fire-8072.firebaseio.com/projects/'
		ref  = new Firebase url
		data = @$firebaseArray ref

		data.$loaded().then =>

			@data_loaded data


	data_loaded: ( data ) ->

		# Assign the data to the scope
		@$scope.data = data

		# Emit that the data is ready to be used
		@$rootScope.$broadcast 'data:loaded'

	
	go: ( url ) ->

		@$rootScope.$apply =>

			@$location.path url