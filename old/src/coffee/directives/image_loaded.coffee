class ImageLoaded extends Directive

	constructor: ->

		return {
			
			restrict: 'A'
			
			link: ( $scope, $element ) ->

				$element.bind 'load', ->

					$element.addClass 'image-loaded'

		}