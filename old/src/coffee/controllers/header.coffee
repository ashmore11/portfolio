class Header extends Controller

	constructor: ( @$scope, @$location, @$rootScope ) ->

		@$scope.controller = @

		@$scope.$on '$locationChangeSuccess', =>

			url = @$location.$$url.split('/')[1]

			switch url

				when ''
					@$scope.location = 'home'

				when 'project'
					@$scope.location = 'project'

				when 'about-me'
					@$scope.location = 'about'