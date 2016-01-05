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

	var _project = __webpack_require__(15);

	var _project2 = _interopRequireDefault(_project);

	var _about = __webpack_require__(16);

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

	var _raf = __webpack_require__(7);

	var _raf2 = _interopRequireDefault(_raf);

	var _renderer = __webpack_require__(8);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _scene = __webpack_require__(10);

	var _scene2 = _interopRequireDefault(_scene);

	var _camera = __webpack_require__(9);

	var _camera2 = _interopRequireDefault(_camera);

	var _projectSphere = __webpack_require__(11);

	var _projectSphere2 = _interopRequireDefault(_projectSphere);

	var _particleSystem = __webpack_require__(13);

	var _particleSystem2 = _interopRequireDefault(_particleSystem);

	var _pivotControls = __webpack_require__(14);

	var _pivotControls2 = _interopRequireDefault(_pivotControls);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Home = {

	  $el: null

	};

	Home.init = function init() {

	  Happens(this);

	  _raf2.default.start();

	  this.$el = $('#three-viewport');
	  this.$el.append(_renderer2.default.obj.domElement);

	  _scene2.default.init();
	  _camera2.default.init();
	  _renderer2.default.init();

	  _projectSphere2.default.init();
	  _pivotControls2.default.init();
	  _particleSystem2.default.init();

	  _camera2.default.obj.position.set(0, 25, 1000);

	  this.bind();
	};

	Home.bind = function bind() {

	  _window2.default.on('resize', this.resize.bind(this));
	  _raf2.default.on('tick', this.update.bind(this));
	};

	Home.runIntroFlyover = function runIntroFlyover() {

	  var params = undefined;

	  _camera2.default.obj.position.set(0, 2500, 5000);

	  params = {
	    y: 25,
	    easing: Sine.easeInOut
	  };

	  TweenMax.to(_camera2.default.obj.position, 5, params);

	  params = {
	    z: 1000,
	    easing: Sine.easeInOut
	  };

	  TweenMax.to(_camera2.default.obj.position, 6.5, params);
	};

	Home.resize = function resize() {

	  _camera2.default.resize();
	  _renderer2.default.resize();
	};

	Home.update = function update() {

	  _renderer2.default.update();
	  _pivotControls2.default.update();
	  _particleSystem2.default.update();
	  _projectSphere2.default.update();
	};

	Home.destroy = function destroy() {

	  _projectSphere2.default.unbind();
	  _pivotControls2.default.unbind();

	  _raf2.default.stop();
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RAF = {

	  ticker: null

	};

	RAF.init = function init() {

	  Happens(this);
	};

	RAF.start = function start() {

	  this.ticker = window.requestAnimationFrame(this.tick.bind(this));
	};

	RAF.stop = function stop() {

	  window.cancelAnimationFrame(this.ticker.bind(this));

	  this.ticker = null;
	};

	RAF.tick = function tick(time) {

	  this.ticker = window.requestAnimationFrame(this.tick.bind(this));

	  this.emit('tick', time);
	};

	RAF.init();

	exports.default = RAF;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	var _camera = __webpack_require__(9);

	var _camera2 = _interopRequireDefault(_camera);

	var _scene = __webpack_require__(10);

	var _scene2 = _interopRequireDefault(_scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Renderer = {

	  obj: new THREE.WebGLRenderer({ antialias: true })

	};

	Renderer.init = function init() {

	  this.obj.setSize(_window2.default.width, _window2.default.height);
	  this.obj.setClearColor(0x000000);
	};

	Renderer.resize = function resize() {

	  this.obj.setSize(_window2.default.width, _window2.default.height);
	};

	Renderer.update = function update() {

	  this.obj.render(_scene2.default.obj, _camera2.default.obj);
	};

	exports.default = Renderer;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	var _scene = __webpack_require__(10);

	var _scene2 = _interopRequireDefault(_scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Camera = {

	  fov: 55,
	  aspect: _window2.default.width / _window2.default.height,
	  near: 0.1,
	  far: 10000,
	  obj: null

	};

	Camera.init = function init() {

	  this.obj = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);

	  _scene2.default.obj.add(this.obj);
	};

	Camera.resize = function resize() {

	  this.obj.aspect = _window2.default.width / _window2.default.height;

	  this.obj.updateProjectionMatrix();
	};

	exports.default = Camera;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Scene = {

	  obj: new THREE.Scene(),
	  fog: new THREE.Fog(0x000000, 10, 10000)

	};

	Scene.init = function init() {

	  this.obj.fog = this.fog;
	};

	Scene.init();

	exports.default = Scene;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	var _textureLoader = __webpack_require__(12);

	var _textureLoader2 = _interopRequireDefault(_textureLoader);

	var _navigation = __webpack_require__(2);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _request = __webpack_require__(4);

	var _request2 = _interopRequireDefault(_request);

	var _scene = __webpack_require__(10);

	var _scene2 = _interopRequireDefault(_scene);

	var _camera = __webpack_require__(9);

	var _camera2 = _interopRequireDefault(_camera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ProjectSphere = {

	  $el: null,
	  data: null,
	  pos: {},
	  projects: [],
	  intersected: null,
	  raycaster: new THREE.Raycaster(),
	  camera_pos: new THREE.Vector3(),
	  projectMouseOver: false,
	  cylinder: {
	    radiusTop: 3000,
	    radiusBottom: 3000,
	    height: 1200,
	    radiusSegments: 16,
	    heightSegments: 16,
	    openEnded: true,
	    thetaStart: 0,
	    thetaLength: Math.PI * 2 / 6.5
	  }

	};

	ProjectSphere.init = function init(data) {

	  this.$el = $('#three-viewport');

	  var url = window.location.origin + '/api/posts';

	  this.getData(url);

	  this.bind();
	};

	ProjectSphere.getData = function getData(url) {
	  var _this = this;

	  _request2.default.get(url).then(function (response) {

	    // this.data = JSON.parse(response).filter(item => {

	    //   return item.state === 'published';

	    // });

	    _this.data = [0, 1, 2, 3, 4, 5];

	    _this.createProjects();
	  });
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
	  var _this2 = this;

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

	    var x = Math.cos(index * (Math.PI * 2) / _this2.data.length);
	    var z = Math.sin(index * (Math.PI * 2) / _this2.data.length);

	    project.position.set(x, 0, z);
	    project.lookAt(target);

	    _this2.projects.push(project);
	    _scene2.default.obj.add(project);
	  });
	};

	/**
	 * Mouse move over the scene
	 */
	ProjectSphere.mouseMove = function mouseMove(event) {

	  var evt = {
	    x: event.pageX || event.originalEvent.touches[0].pageX,
	    y: event.pageY || event.originalEvent.touches[0].pageY
	  };

	  this.pos.x = evt.x / _window2.default.width * 2 - 1;
	  this.pos.y = -(evt.y / _window2.default.height) * 2 + 1;
	};

	/**
	 * Mouse down on a project
	 */
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

	/**
	 * Mouse over a project
	 */
	ProjectSphere.mouseOver = function mouseOver() {

	  this.projectMouseOver = true;

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

	/**
	 * Mouse out of a project
	 */
	ProjectSphere.mouseOut = function mouseOut() {

	  this.projectMouseOver = false;

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
	  this.camera_pos.setFromMatrixPosition(_camera2.default.obj.matrixWorld);

	  this.raycaster.ray.origin.copy(this.camera_pos);

	  this.raycaster.ray.direction.set(this.pos.x, this.pos.y, 0).unproject(_camera2.default.obj).sub(this.camera_pos).normalize();

	  var intersects = this.raycaster.intersectObjects(this.projects);

	  if (intersects.length > 0) {

	    this.intersected = intersects[0].object;

	    if (!_window2.default.width < 768 && !this.projectMouseOver) this.mouseOver();
	  } else {

	    if (!_window2.default.width < 768 && this.intersected) this.mouseOut();

	    this.intersected = null;
	  }
	};

	exports.default = ProjectSphere;

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _textureLoader = __webpack_require__(12);

	var _textureLoader2 = _interopRequireDefault(_textureLoader);

	var _scene = __webpack_require__(10);

	var _scene2 = _interopRequireDefault(_scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ParticleSystem = {

		geometry: new THREE.Geometry(),
		materials: [],
		particles: [],
		count: 5000,
		parameters: [[[1, 1, 0.5], 5], [[0.95, 1, 0.5], 4], [[0.90, 1, 0.5], 3], [[0.85, 1, 0.5], 2], [[0.80, 1, 0.5], 1]]

	};

	ParticleSystem.init = function init() {

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

			_scene2.default.obj.add(particle);
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _window = __webpack_require__(6);

	var _window2 = _interopRequireDefault(_window);

	var _camera = __webpack_require__(9);

	var _camera2 = _interopRequireDefault(_camera);

	var _scene = __webpack_require__(10);

	var _scene2 = _interopRequireDefault(_scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PivotControls = {

		$el: null,
		scene: null,
		pivot: null,
		tween: null,
		pos: {
			a: 0,
			x: 0
		},
		pivot: new THREE.Object3D()

	};

	PivotControls.init = function init() {

		this.$el = $('#three-viewport');

		_scene2.default.obj.add(this.pivot);

		this.pivot.add(_camera2.default.obj);

		this.bind();
	};

	PivotControls.bind = function bind() {

		this.$el.on('mousemove', this.mouseMove.bind(this));
		this.$el.on('touchstart', this.touchStart.bind(this));
		this.$el.on('touchmove', this.touchMove.bind(this));
		this.$el.on('touchend', this.touchEnd.bind(this));
	};

	PivotControls.unbind = function unbind() {

		this.$el.off('mousemove');
		this.$el.off('touchstart');
		this.$el.off('touchmove');
		this.$el.off('touchend');
	};

	PivotControls.mouseMove = function mouseMove() {

		this.pos.x = event.pageX;
		this.pos.x = this.pos.x - _window2.default.width / 2;
		this.pos.x = this.pos.x * 0.000025;
	};

	PivotControls.touchStart = function touchStart() {

		this.pos.a = event.originalEvent.touches[0].pageX;
	};

	PivotControls.touchMove = function touchMove() {

		this.pos.x = event.originalEvent.touches[0].pageX;
		this.pos.x = this.pos.x - this.pos.a;
		this.pos.x = this.pos.x * -0.000025;
	};

	PivotControls.touchEnd = function touchEnd() {

		var duration = Math.round(Math.abs(this.pos.x * 100000));

		TweenMax.to(this.pos, duration, { x: 0, easing: Sine.easeOut });
	};

	PivotControls.update = function update() {

		this.pivot.rotation.y = this.pivot.rotation.y - this.pos.x;

		_camera2.default.obj.lookAt(_scene2.default.obj.position);
	};

	exports.default = PivotControls;

/***/ },
/* 15 */
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
/* 16 */
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