class ThreeSkull extends Directive

	constructor: ->

		return {

			link: ( $scope, $element ) ->

				view = new View $scope, $element

				$scope.$on '$destroy', ->

					do view.destroy

					view = null

				return view

		}

###

V I E W P O R T

###

class View

	win: $ window

	scene   : null
	camera  : null
	target  : null
	renderer: null

	mouse:
		x: 0
		y: 0

	pos:
		x: 0
		y: 0
		a: 0
		b: 0

	attributes     : null
	uniforms       : null
	shader_material: null
	geometry       : null
	skull          : null

	RAF: null

	constructor: ( @$scope, @$element ) ->

		TweenMax.set $('.spinner'), autoAlpha: 0

		@scene = new THREE.Scene
		
		@camera = new THREE.PerspectiveCamera 50, @win.width() / @win.height(), 0.1, 10000
		@camera.position.set 0, 0, 130

		loader = new THREE.JSONLoader
		loader.load 'json/skull.json', @on_model_loaded

		@target = new THREE.Vector3

		@renderer = new THREE.WebGLRenderer antialias: true
		@renderer.setSize window.innerWidth, window.innerHeight
		@renderer.setClearColor 0x000000

		@$element.append @renderer.domElement

		do @create_shader_material
		do @bind


	bind: ->

		@win.on 'resize', @resize
		@win.on 'mousemove touchmove', @mousemove


	unbind: ->

		@win.off 'resize', @resize
		@win.off 'mousemove touchmove', @mousemove


	mousemove: ( event ) =>

		@mouse =
			x: event.pageX or event.originalEvent.touches[ 0 ].pageX
			y: event.pageY or event.originalEvent.touches[ 0 ].pageY


	create_shader_material: =>

		@attributes = 
			displacement : type: 'v3', value: []
			customColor  : type: 'c' , value: []

		@uniforms = 
			amplitude : type: 'f', value: 0

		@shader_material = new THREE.ShaderMaterial
			uniforms       : @uniforms
			attributes     : @attributes
			vertexShader   : $('#vertex_shader').text()
			fragmentShader : $('#fragment_shader').text()
			side           : THREE.DoubleSide


	on_model_loaded: ( geometry ) =>

		@geometry = geometry

		@skull = new THREE.Mesh @geometry, @shader_material
		@skull.position.y = 4

		@scene.add @skull

		do @hide_loader
		do @geometry.center
		do @tessellate_geometry
		do @explode_geometry
		do @colors_and_displacement
		do @animate


	hide_loader: ->

		params = 
			autoAlpha: 0
			ease: Expo.easeOut

		TweenMax.to $('.loader'), 2, params


	tessellate_geometry: ->

		tessellateModifier = new THREE.TessellateModifier 1
		tessellateModifier.modify @geometry for i in [ 0..12 ]


	explode_geometry: ->

		explodeModifier = new THREE.ExplodeModifier
		explodeModifier.modify @geometry


	colors_and_displacement: ->

		colors       = @attributes.customColor.value
		displacement = @attributes.displacement.value

		v = 0

		for f in [ 0...@geometry.faces.length ]

			h = 0   * Math.random()
			s = 0   * Math.random()
			l = 0.3 * Math.random()

			x = 112 * ( 0.5 - Math.random() )
			y = 112 * ( 0.5 - Math.random() )
			z = 112 * ( 0.5 - Math.random() )

			for i in [ 0..2 ]

				colors[ v ] = new THREE.Color
				colors[ v ].setHSL( h, s, l )
				colors[ v ].convertGammaToLinear()

				displacement[ v ] = new THREE.Vector3
				displacement[ v ].set( x, y, z )

				v += 1


	look_at_mouse: ->

		@pos.x += ( @mouse.x - @pos.x ) / 50
		@pos.y += ( @mouse.y - @pos.y ) / 50

		x = ( @pos.x / window.innerWidth )  * 2 - 1
		y = -( @pos.y / window.innerHeight ) * 2 + 4.75
		z = 0.5

		@target.set x, y, z

		@skull.lookAt @target


	animate_faces: ->

		@pos.a += ( @mouse.x - @pos.a ) / 50

		x = ( @pos.a / window.innerWidth ) * 2 - 1

		@uniforms.amplitude.value = x


	resize: =>

		width  = @win.width()
		height = @win.height()

		@camera.aspect = width / height
		@camera.updateProjectionMatrix()

		@renderer.setSize width, height


	animate: =>

		@RAF = requestAnimationFrame @animate

		do @update


	update: ->

		@renderer.render @scene, @camera
			
		do @look_at_mouse
		do @animate_faces

	
	destroy: ->

		do @unbind

		cancelAnimationFrame @RAF

		@RAF = null
