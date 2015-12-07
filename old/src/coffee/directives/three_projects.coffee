class ThreeProjects extends Directive

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

	scene    : null
	camera   : null
	controls : null
	particles: null
	projects : null
	renderer : null

	cam_tween_complete: false

	RAF: null

	constructor: ( @$scope, @$element ) ->

		Happens @

		@$scope.$on 'data:loaded', =>

			do @init
			do @animate


	init: ->

		@scene = new THREE.Scene

		@camera = new THREE.PerspectiveCamera 50, @win.width() / @win.height(), 0.1, 10000

		@scene.add @camera

		@scene.fog = new THREE.Fog 0x000000, 10, 10000

		@controls  = new OrbitControls @scene, @camera
		@particles = new ParticleSystem @scene
		@projects  = new ProjectSphere @$scope, @scene, @camera
		
		@renderer = new THREE.WebGLRenderer antialias: true
		@renderer.setSize window.innerWidth, window.innerHeight
		@renderer.setClearColor 0x000000

		@$element.append @renderer.domElement

		if window.images_loaded
		
			@cam_tween_complete = true
			@camera.position.set 0, 25, 1000
			@controls.pos.x = -0.00025
		
		else
			
			do @create_loader 

		do @bind


	bind: ->

		@win.on 'resize', @resize


	unbind: ->

		@win.off 'resize', @resize


	create_loader: ->

		manager = new THREE.LoadingManager
		loader  = new THREE.ImageLoader manager

		for item in @$scope.data

			for asset in item.assets

				if asset.id is 'big-home-image'

					loader.load asset.src

		manager.onProgress = ( item, loaded, total ) =>

			percent = loaded / total * 100

			$( '.spinner' ).find( '.line' ).css width: "#{percent}%"

			if loaded is total

				do @animate_camera_pos
				do @hide_loader

			@on 'loader:hidden', =>

				for project in @projects.spheres

					@projects.fade_out_project project

				window.images_loaded = true


	hide_loader: ->

		params = 
			autoAlpha : 0
			ease      : Cubic.easeInOut
			onComplete: =>

				params = 
					autoAlpha : 0
					ease      : Cubic.easeInOut
					onComplete: => @emit 'loader:hidden'

				TweenMax.to $( '.loader' ), 1.5, params

		TweenMax.to $( '.spinner' ), 0.5, params


	animate_camera_pos: ->

		@camera.position.set 0, 2500, 5000

		@controls.pos.x = -0.00025

		tween = new TWEEN.Tween @camera.position

			.to y: 25, 5000
			.easing TWEEN.Easing.Sinusoidal.InOut
			.onComplete => @cam_tween_complete = true

		do tween.start

		tween = new TWEEN.Tween @camera.position

			.to z: 1000, 6500
			.easing TWEEN.Easing.Sinusoidal.InOut

		do tween.start


	resize: =>

		@renderer.setSize window.innerWidth, window.innerHeight

		@camera.aspect = window.innerWidth / window.innerHeight
		
		do @camera.updateProjectionMatrix


	animate: ( time ) =>
		
		@RAF = requestAnimationFrame @animate

		do @update


	update: ->
		
		@renderer.render @scene, @camera

		do TWEEN.update
		do @controls.update if @cam_tween_complete
		do @controls.watch_target
		do @particles.update
		do @projects.update


	destroy: ->

		do @projects.unbind
		do @controls.unbind
		do @unbind

		cancelAnimationFrame @RAF

		@RAF = null

###

P R O J E C T S

###

class ProjectSphere

	win: $ window
	el : null

	raycaster : null
	camera_pos: null

	pos:
		x: 0
		y: 0

	spheres    : null
	intersected: null

	constructor: ( @$scope, @scene, @camera ) ->

		@el = $ '#three-viewport'

		@raycaster  = new THREE.Raycaster
		@camera_pos = new THREE.Vector3

		do @bind
		do @create_projects
		

	bind: ->
		
		@el.on 'mousemove touchmove', @scene_mouse_move
		@el.on 'mousedown touchstart', @project_mouse_down


	unbind: ->
		
		@el.off 'mousemove touchmove', @scene_mouse_move
		@el.off 'mousedown touchstart', @project_mouse_down


	create_projects: ->

		@spheres = []
		target   = new THREE.Vector3
		geometry = new THREE.SphereGeometry 3000, 16, 16, 4.4, 0.6, -1.725, 0.35

		if @win.width() < 768 and window.images_loaded
			opacity = 1
		else if window.images_loaded
			opacity = 0.5
		else
			opacity = 0

		for item, i in @$scope.data

			texture           = THREE.ImageUtils.loadTexture item.assets[0].src
			texture.minFilter = THREE.LinearFilter
			texture.flipY     = false

			material = new THREE.MeshBasicMaterial
				map         : texture
				transparent : true
				opacity     : opacity

			project = new THREE.Mesh geometry, material

			project.scale.x       = -1
			project.material.side = THREE.DoubleSide
			project.name          = 'project'
			project.title         = item.title
			project.url           = item.url

			x = Math.cos( 2 * Math.PI * i / 6 ) * 400
			z = Math.sin( 2 * Math.PI * i / 6 ) * 400

			project.position.set x, 0, z

			project.lookAt target

			@spheres.push project

			@scene.add project


	fade_in_project: ( object ) ->

		tween = new TWEEN.Tween object.material

			.to opacity: 1, 750
			.easing TWEEN.Easing.Sinusoidal.Out

		do tween.start


	fade_out_project: ( object ) ->

		if @win.width() < 768
			opacity = 1
		else
			opacity = 0.5

		tween = new TWEEN.Tween object.material

			.to opacity: opacity, 750
			.easing TWEEN.Easing.Sinusoidal.Out

		do tween.start


	scene_mouse_move: ( event ) =>

		evt =
			x: event.pageX or event.originalEvent.touches[ 0 ].pageX
			y: event.pageY or event.originalEvent.touches[ 0 ].pageY

		@pos =
			x:   ( evt.x / @win.width()  ) * 2 - 1
			y: - ( evt.y / @win.height() ) * 2 + 1


	project_mouse_down: ( event ) =>

		evt =
			x: event.pageX or event.originalEvent.touches[ 0 ].pageX
			y: event.pageY or event.originalEvent.touches[ 0 ].pageY

		@pos =
			x:   ( evt.x / @win.width()  ) * 2 - 1
			y: - ( evt.y / @win.height() ) * 2 + 1

		intersects = @raycaster.intersectObjects @spheres

		if intersects.length > 0

			@$scope.controller.go intersects[ 0 ].object.url


	project_mouse_over: ->

		$('#home h1').html @intersected.title

		TweenMax.to $('#home h1'), 0.5, autoAlpha: 1, y: -10, scale: 1
		
		@fade_in_project @intersected

		@el.css cursor: 'pointer'

	
	project_mouse_out: ->

		if @intersected
			
			@fade_out_project @intersected

			@el.css cursor: 'ew-resize'

			TweenMax.to $('#home h1'), 0.5, autoAlpha: 0, y: 0, scale: 0.9


	update: ->

		# taking the camera's world position into consideration
		@camera_pos.setFromMatrixPosition @camera.matrixWorld

		@raycaster.ray.origin.copy @camera_pos

		@raycaster.ray.direction
			.set @pos.x, @pos.y, 0
			.unproject @camera
			.sub @camera_pos
			.normalize

		intersects = @raycaster.intersectObjects @spheres

		if intersects.length > 0

			@intersected = intersects[ 0 ].object

			do @project_mouse_over unless @win.width() < 768

		else

			do @project_mouse_out unless @win.width() < 768

			@intersected = null

###

P A R T I C L E S

###

class ParticleSystem

	geometry  : null
	materials : null
	particles : null
	count     : null
	parameters: null

	constructor: ( @scene ) ->

		@geometry  = new THREE.Geometry
		@materials = []
		@particles = []
		@count     = 5000

		for i in [ 0...@count ]

			vertex   = new THREE.Vector3
			vertex.x = Math.random() * 8000 - 4000
			vertex.y = Math.random() * 8000 - 4000
			vertex.z = Math.random() * 8000 - 4000

			@geometry.vertices.push vertex

		@parameters = [
			[ [1, 1, 0.5], 5 ],
			[ [0.95, 1, 0.5], 4 ],
			[ [0.90, 1, 0.5], 3 ],
			[ [0.85, 1, 0.5], 2 ],
			[ [0.80, 1, 0.5], 1 ]
		]

		for i in [ 0...@parameters.length ]

			size = @parameters[ i ][ 1 ]

			@materials[ i ] = new THREE.PointCloudMaterial
				size        : size
				map         : THREE.ImageUtils.loadTexture 'images/_tmp/particle.jpg'
				blending    : THREE.NormalBlending
				transparent : true

			particle = new THREE.PointCloud @geometry, @materials[ i ]

			particle.rotation.x = Math.random() * 6
			particle.rotation.y = Math.random() * 6
			particle.rotation.z = Math.random() * 6

			@particles.push particle

			@scene.add particle

	
	update: ->

		time = Date.now() * 0.00002

		for i in [ 0...@particles.length ]

			object = @particles[ i ]

			object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) )

###

C O N T R O L S

###

class OrbitControls

	doc: $ document

	pivot: null
	tween: null
	
	pos:
		a: 0
		x: 0

	constructor: ( @scene, @camera ) ->

		@pivot = new THREE.Object3D

		@scene.add @pivot
		@pivot.add @camera

		do @bind

	
	bind: ->

		@doc.on 'mousemove',  @mouse_move
		@doc.on 'touchstart', @touch_start
		@doc.on 'touchmove',  @touch_move
		@doc.on 'touchend',   @touch_end


	unbind: ->

		@doc.off 'mousemove',  @mouse_move
		@doc.off 'touchstart', @touch_start
		@doc.off 'touchmove',  @touch_move
		@doc.off 'touchend',   @touch_end


	mouse_move: ( event ) =>

		@pos.x = event.pageX
		@pos.x = @pos.x - $( window ).width() / 2
		@pos.x = @pos.x * 0.000025


	touch_start: ( event ) =>

		@pos.a = event.originalEvent.touches[ 0 ].pageX


	touch_move: ( event ) =>

		do @tween?.stop

		@pos.x = event.originalEvent.touches[ 0 ].pageX
		@pos.x = @pos.x - @pos.a
		@pos.x = @pos.x * -0.000075


	touch_end: =>

		duration = Math.round Math.abs @pos.x * 100000

		@tween = new TWEEN.Tween @pos

			.to x: 0, duration
			.easing TWEEN.Easing.Sinusoidal.Out

		do @tween.start


	watch_target: ->

		@camera.lookAt @scene.position


	update: ->
			
		@pivot.rotation.y = @pivot.rotation.y - @pos.x
