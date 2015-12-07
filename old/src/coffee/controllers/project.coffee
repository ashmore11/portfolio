class Project extends Controller

	constructor: ( @$scope, $routeParams, $firebaseObject ) ->

		url = 'https://scorching-fire-8072.firebaseio.com/projects/' + $routeParams.id
		ref = new Firebase url

		@$scope.page       = 'project'
		@$scope.data       = $firebaseObject ref
		@$scope.controller = @

		@loader  = $ '.loader'
		@spinner = $ '.spinner'

		do @load_images


	load_images: ->

		@$scope.$on 'PROGRESS', ( $event, progress ) =>

			switch progress.status
				
				when 'QUARTER'       then load_progress = 25
				when 'HALF'          then load_progress = 50
				when 'THREEQUARTERS' then load_progress = 75
				
				when 'FULL'

					load_progress = 100

					do @hide_loader
					do @show_images

			@spinner.find('.line').css width: "#{load_progress}%"


	hide_loader: ->

		params = 
			autoAlpha : 0
			ease      : Linear.easeInOut
			onComplete: =>

				params = 
					autoAlpha : 0
					ease      : Linear.easeInOut

				TweenMax.to @loader, 1.5, params

		TweenMax.to @spinner, 0.5, params


	show_images: ->

		params = 
			autoAlpha: 1
			ease     : Cubic.easeInOut

		TweenMax.to $('.image'), 2, params