/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _view = __webpack_require__(1);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = {

	  init: function init() {

	    _view2.default.init();
	  }

	};

	App.init();

	window.APP = App;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _navigation = __webpack_require__(2);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _transitions = __webpack_require__(3);

	var _transitions2 = _interopRequireDefault(_transitions);

	var _request = __webpack_require__(4);

	var _request2 = _interopRequireDefault(_request);

	var _home = __webpack_require__(5);

	var _home2 = _interopRequireDefault(_home);

	var _project = __webpack_require__(11);

	var _project2 = _interopRequireDefault(_project);

	var _about = __webpack_require__(12);

	var _about2 = _interopRequireDefault(_about);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var View = {

	  $el: $('#main'),
	  view: null,
	  views: {
	    home: _home2.default,
	    project: _project2.default,
	    about: _about2.default
	  }

	};

	View.init = function init() {

	  this.load(_navigation2.default.originalState, _navigation2.default.getID());

	  this.bind();
	};

	View.bind = function bind() {

	  _navigation2.default.on('url:changed', this.load.bind(this));
	};

	View.load = function load(url, id) {
	  var _this = this;

	  _request2.default.get(url).then(function (response) {

	    var html = undefined;

	    html = $.parseHTML(response);
	    html = html.filter(function (item) {
	      return item.id === 'main';
	    });

	    _transitions2.default.fadeOut(_this.$el, 1, function () {

	      _this.render(html, id);
	    });
	  });
	};

	View.render = function render(html, id) {
	  var _this2 = this;

	  this.$el.html(html);

	  if (this.view) this.view.destroy();

	  this.view = void 0;
	  this.view = this.views[id];

	  this.view.init();
	  this.view.on('view:ready', function () {

	    _transitions2.default.fadeIn(_this2.$el, 0.5);
	  });
	};

	exports.default = View;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Navigation = {

		originalState: window.location.pathname,
		url: null

	};

	Navigation.init = function init() {

		Happens(this);

		this.url = this.originalState;

		this.bind();
	};

	Navigation.bind = function bind() {

		$(window).bind('popstate', this.popState.bind(this));
	};

	Navigation.go = function go(url) {

		if (this.url === url) return;

		this.pushState(url);
	};

	Navigation.pushState = function pushState(url) {

		this.url = url;

		history.pushState(this.url, null, this.url);

		this.emit('url:changed', this.url, this.getID());
	};

	Navigation.popState = function popState(event) {

		this.url = event.originalEvent.state || this.originalState;

		this.emit('url:changed', this.url, this.getID());
	};

	Navigation.getID = function getID() {

		if (this.url === '/') {

			return 'home';
		} else if (this.url === '/about') {

			return 'about';
		} else {

			return 'project';
		}
	};

	Navigation.init();

	exports.default = Navigation;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Transitions = {

	  init: function init() {

	    Happens(this);
	  },

	  fadeIn: function fadeIn(el, duration) {

	    TweenMax.set(el, { autoAlpha: 0 });

	    var params = {
	      autoAlpha: 1,
	      ease: Power2.easeInOut
	    };

	    TweenMax.to(el, duration, params);
	  },

	  fadeOut: function fadeOut(el, duration, callback) {

	    var params = {
	      autoAlpha: 0,
	      ease: Power2.easeOut,
	      onComplete: function onComplete() {
	        callback();
	      }
	    };

	    TweenMax.to(el, duration, params);
	  }

	};

	Transitions.init();

	exports.default = Transitions;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Request = {

	  get: function get(url) {

	    return new Promise(function (resolve, reject) {

	      var req = new XMLHttpRequest();

	      req.open('GET', url);

	      req.onload = function () {

	        if (req.status == 200) {

	          resolve(req.response);
	        } else {

	          reject(Error(req.statusText));
	        }
	      };

	      req.onerror = function () {
	        reject(Error("Network Error"));
	      };

	      req.send();
	    });
	  }

	};

	exports.default = Request;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	var _projectSphere = __webpack_require__(7);

	var _projectSphere2 = _interopRequireDefault(_projectSphere);

	var _particleSystem = __webpack_require__(9);

	var _particleSystem2 = _interopRequireDefault(_particleSystem);

	var _orbitControls = __webpack_require__(10);

	var _orbitControls2 = _interopRequireDefault(_orbitControls);

	var _request = __webpack_require__(4);

	var _request2 = _interopRequireDefault(_request);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Home = {

	  $el: null,
	  projectSphere: _projectSphere2.default,
	  controls: _orbitControls2.default,
	  particles: _particleSystem2.default

	};

	Home.init = function init() {
	  var _this = this;

	  Happens(this);

	  this.$el = $('#three-viewport');

	  var host = window.location.origin;
	  var url = host + '/api/posts';

	  _request2.default.get(url).then(function (response) {

	    _this.data = JSON.parse(response).filter(function (item) {

	      return item.state === 'published';
	    });

	    _this.initScene();

	    _this.emit('view:ready');
	  });
	};

	Home.initScene = function initScene() {

	  this.scene = new THREE.Scene();
	  this.scene.fog = new THREE.Fog(0x000000, 10, 10000);

	  this.camera = new THREE.PerspectiveCamera(55, _window2.default.width / _window2.default.height, 0.1, 10000);

	  this.projectSphere.init(this.data, this.scene, this.camera);
	  this.controls.init(this.scene, this.camera);
	  this.particles.init(this.scene);

	  this.renderer = new THREE.WebGLRenderer({ antialias: true });
	  this.renderer.setSize(_window2.default.width, _window2.default.height);
	  this.renderer.setClearColor(0x000000);

	  this.$el.append(this.renderer.domElement);

	  // this.animateCameraPos();

	  this.camTweenComplete = true;
	  this.camera.position.set(0, 25, 1000);
	  this.controls.pos.x = -0.00025;

	  this.render();
	  this.bind();
	};

	Home.bind = function bind() {

	  _window2.default.on('resize', this.resize.bind(this));
	};

	Home.animateCameraPos = function animateCameraPos() {
	  var _this2 = this;

	  this.camera.position.set(0, 2500, 5000);
	  this.controls.pos.x = -0.00025;

	  var tweenCamY = new TWEEN.Tween(this.camera.position);
	  tweenCamY.to({ y: 25 }, 5000);
	  tweenCamY.easing(TWEEN.Easing.Sinusoidal.InOut);
	  tweenCamY.onComplete(function () {
	    _this2.camTweenComplete = true;
	  });
	  tweenCamY.start();

	  var tweenCamZ = new TWEEN.Tween(this.camera.position);
	  tweenCamZ.to({ z: 1000 }, 6500);
	  tweenCamZ.easing(TWEEN.Easing.Sinusoidal.InOut);
	  tweenCamZ.start();
	};

	Home.resize = function resize() {

	  this.renderer.setSize(_window2.default.width, _window2.default.height);
	  this.camera.aspect = _window2.default.width / _window2.default.height;

	  this.camera.updateProjectionMatrix();
	};

	Home.render = function render() {

	  this.RAF = requestAnimationFrame(this.render.bind(this));

	  this.renderer.render(this.scene, this.camera);

	  this.update();
	};

	Home.update = function update() {

	  this.controls.update();
	  this.particles.update();
	  this.projectSphere.update();
	};

	Home.destroy = function destroy() {

	  console.log('destroy HOME');

	  this.projectSphere.unbind();
	  this.controls.unbind();

	  cancelAnimationFrame(this.RAF);
	  this.RAF = null;
	};

	exports.default = Home;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Window = {

		$el: $(window),
		width: 0,
		height: 0

	};

	Window.init = function init() {

		Happens(this);

		this.resize();
		this.bind();
	};

	Window.bind = function bind() {

		this.$el.on('resize', this.resize.bind(this));
		this.$el.on('keydown', this.keydown.bind(this));
	};

	Window.resize = function resize() {

		this.width = this.$el.width();
		this.height = this.$el.height();

		this.emit('resize');
	};

	Window.keydown = function keydown(event) {

		var key = undefined;

		if (event.keyCode === 38) key = 'up';
		if (event.keyCode === 40) key = 'down';
		if (event.keyCode === 37) key = 'left';
		if (event.keyCode === 39) key = 'right';

		this.emit('keydown', key);
	};

	Window.init();

	exports.default = Window;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	var _textureLoader = __webpack_require__(8);

	var _textureLoader2 = _interopRequireDefault(_textureLoader);

	var _navigation = __webpack_require__(2);

	var _navigation2 = _interopRequireDefault(_navigation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ProjectSphere = {

		$el: null,
		data: null,
		scene: null,
		camera: null,
		pos: {},
		projects: [],
		intersected: null,
		raycaster: new THREE.Raycaster(),
		camera_pos: new THREE.Vector3(),
		cylinder: {
			radiusTop: 3000,
			radiusBottom: 3000,
			height: 1200,
			radiusSegments: 16,
			heightSegments: 16,
			openEnded: true,
			thetaStart: 0,
			thetaLength: Math.PI * 2 / 6.25
		}

	};

	ProjectSphere.init = function init(data, scene, camera) {

		this.$el = $('#three-viewport');

		this.data = [0, 1, 2, 3, 4, 5];
		this.scene = scene;
		this.camera = camera;

		this.bind();
		this.createProjects();
	};

	ProjectSphere.bind = function bind() {

		this.$el.on('mousemove touchmove', this.mouseMove.bind(this));
		this.$el.on('mousedown touchstart', this.mouseDown.bind(this));
	};

	ProjectSphere.unbind = function unbind() {

		this.$el.off('mousemove touchmove');
		this.$el.off('mousedown touchstart');
	};

	ProjectSphere.createProjects = function createProjects() {
		var _this = this;

		var target = new THREE.Vector3();
		var geometry = new THREE.CylinderGeometry(this.cylinder.radiusTop, this.cylinder.radiusBottom, this.cylinder.height, this.cylinder.radiusSegments, this.cylinder.heightSegments, this.cylinder.openEnded, this.cylinder.thetaStart, this.cylinder.thetaLength);

		this.data.forEach(function (item, index) {

			// const texture = TextureLoader(item.featuredImage.url);

			// texture.minFilter = THREE.LinearFilter;

			var material = new THREE.MeshBasicMaterial({
				// map         : texture,
				transparent: true,
				opacity: 0.5,
				wireframe: true
			});

			var project = new THREE.Mesh(geometry, material);

			project.scale.x = -1;
			project.material.side = THREE.DoubleSide;
			project.name = 'project';
			// project.title         = item.title;
			// project.url           = `/project/${item.slug}`;

			var x = Math.cos(index * (Math.PI * 2) / _this.data.length);
			var z = Math.sin(index * (Math.PI * 2) / _this.data.length);

			project.position.set(x, 0, z);
			project.lookAt(target);

			_this.projects.push(project);
			_this.scene.add(project);
		});
	};

	ProjectSphere.mouseMove = function mouseMove(event) {

		var evt = {
			x: event.pageX || event.originalEvent.touches[0].pageX,
			y: event.pageY || event.originalEvent.touches[0].pageY
		};

		this.pos.x = evt.x / _window2.default.width * 2 - 1;
		this.pos.y = -(evt.y / _window2.default.height) * 2 + 1;
	};

	ProjectSphere.mouseDown = function mouseDown(event) {

		var evt = {
			x: event.pageX || event.originalEvent.touches[0].pageX,
			y: event.pageY || event.originalEvent.touches[0].pageY
		};

		this.pos.x = evt.x / _window2.default.width * 2 - 1;
		this.pos.y = -(evt.y / _window2.default.height) * 2 + 1;

		var intersects = this.raycaster.intersectObjects(this.projects);

		if (intersects.length > 0) {

			_navigation2.default.go(intersects[0].object.url);
		}
	};

	ProjectSphere.mouseOver = function mouseOver() {

		var title = $('#home h1');
		var material = this.intersected.material;

		var params = undefined;

		this.$el.css({ cursor: 'pointer' });

		title.html(this.intersected.title);

		params = {
			autoAlpha: 1,
			y: -10,
			scale: 1
		};

		TweenMax.to(title, 0.5, params);

		params = {
			opacity: 0.75,
			easing: Sine.easeOut
		};

		TweenMax.to(material, 0.75, { opacity: 1 });
	};

	ProjectSphere.mouseOut = function mouseOut() {

		var title = $('#home h1');
		var material = this.intersected.material;

		var params = undefined;

		this.$el.css({ cursor: 'ew-resize' });

		params = {
			autoAlpha: 0,
			y: 0,
			scale: 0.9
		};

		TweenMax.to(title, 0.5, params);

		params = {
			opacity: 0.5,
			easing: Sine.easeOut
		};

		TweenMax.to(material, 0.75, params);
	};

	ProjectSphere.update = function update() {

		// taking the camera's world position into consideration
		this.camera_pos.setFromMatrixPosition(this.camera.matrixWorld);

		this.raycaster.ray.origin.copy(this.camera_pos);

		this.raycaster.ray.direction.set(this.pos.x, this.pos.y, 0).unproject(this.camera).sub(this.camera_pos).normalize();

		var intersects = this.raycaster.intersectObjects(this.projects);

		if (intersects.length > 0) {

			this.intersected = intersects[0].object;

			if (!_window2.default.width < 768) this.mouseOver();
		} else {

			if (!_window2.default.width < 768 && this.intersected) this.mouseOut();

			this.intersected = null;
		}
	};

	exports.default = ProjectSphere;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TextureLoader = function TextureLoader(url) {

	  var loader = new THREE.TextureLoader();

	  loader.crossOrigin = '';

	  return loader.load(url, function (texture) {

	    return texture;
	  });
	};

	exports.default = TextureLoader;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _textureLoader = __webpack_require__(8);

	var _textureLoader2 = _interopRequireDefault(_textureLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ParticleSystem = {

		scene: null,
		geometry: new THREE.Geometry(),
		materials: [],
		particles: [],
		count: 5000,
		parameters: [[[1, 1, 0.5], 5], [[0.95, 1, 0.5], 4], [[0.90, 1, 0.5], 3], [[0.85, 1, 0.5], 2], [[0.80, 1, 0.5], 1]]

	};

	ParticleSystem.init = function init(scene) {

		this.scene = scene;

		this.pushVertices();

		this.createParticles();
	};

	ParticleSystem.pushVertices = function pushVertices() {
		var _this = this;

		_.times(this.count, function () {

			var vertex = new THREE.Vector3();

			vertex.x = Math.random() * 8000 - 4000;
			vertex.y = Math.random() * 8000 - 4000;
			vertex.z = Math.random() * 8000 - 4000;

			_this.geometry.vertices.push(vertex);
		});
	};

	ParticleSystem.createParticles = function createParticles() {
		var _this2 = this;

		this.parameters.map(function (item, index) {

			var size = item[1];

			_this2.materials[index] = new THREE.PointsMaterial({
				size: size,
				map: (0, _textureLoader2.default)('images/_tmp/particle.jpg'),
				blending: THREE.NormalBlending,
				transparent: true
			});

			var particle = new THREE.Points(_this2.geometry, _this2.materials[index]);

			particle.rotation.x = Math.random() * 6;
			particle.rotation.y = Math.random() * 6;
			particle.rotation.z = Math.random() * 6;

			_this2.particles.push(particle);

			_this2.scene.add(particle);
		});
	};

	ParticleSystem.update = function update() {

		var time = Date.now() * 0.00001;

		this.particles.map(function (item, index) {

			item.rotation.y = time * (index < 4 ? index + 1 : -(index + 1));
		});
	};

	exports.default = ParticleSystem;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var OrbitControls = {

		$el: null,
		scene: null,
		camera: null,
		pivot: null,
		tween: null,
		pos: {
			a: 0,
			x: 0
		},
		pivot: new THREE.Object3D()

	};

	OrbitControls.init = function init(scene, camera) {

		this.$el = $('#three-viewport');

		this.scene = scene;
		this.camera = camera;

		this.scene.add(this.pivot);
		this.pivot.add(this.camera);

		this.bind();
	};

	OrbitControls.bind = function bind() {

		this.$el.on('mousemove', this.mouseMove.bind(this));
		this.$el.on('touchstart', this.touchStart.bind(this));
		this.$el.on('touchmove', this.touchMove.bind(this));
		this.$el.on('touchend', this.touchEnd.bind(this));
	};

	OrbitControls.unbind = function unbind() {

		this.$el.off('mousemove');
		this.$el.off('touchstart');
		this.$el.off('touchmove');
		this.$el.off('touchend');
	};

	OrbitControls.mouseMove = function mouseMove() {

		this.pos.x = event.pageX;
		this.pos.x = this.pos.x - _window2.default.width / 2;
		this.pos.x = this.pos.x * 0.000025;
	};

	OrbitControls.touchStart = function touchStart() {

		this.pos.a = event.originalEvent.touches[0].pageX;
	};

	OrbitControls.touchMove = function touchMove() {

		this.pos.x = event.originalEvent.touches[0].pageX;
		this.pos.x = this.pos.x - this.pos.a;
		this.pos.x = this.pos.x * -0.000025;
	};

	OrbitControls.touchEnd = function touchEnd() {

		var duration = Math.round(Math.abs(this.pos.x * 100000));

		TweenMax.to(this.pos, duration, { x: 0, easing: Sine.easeOut });
	};

	OrbitControls.update = function update() {

		this.pivot.rotation.y = this.pivot.rotation.y - this.pos.x;

		this.camera.lookAt(this.scene.position);
	};

	exports.default = OrbitControls;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Project = {

	  $el: $('#project')

	};

	Project.init = function init() {

	  Happens(this);

	  console.log('init PROJECT');

	  this.emit('view:ready');
	};

	Project.destroy = function destroy() {

	  console.log('destroy PROJECT');
	};

	exports.default = Project;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var About = {

	  $el: $('#about')

	};

	About.init = function init() {

	  Happens(this);

	  console.log('init ABOUT');

	  this.emit('view:ready');
	};

	About.destroy = function destroy() {

	  console.log('destroy ABOUT');
	};

	exports.default = About;

/***/ }
/******/ ]);