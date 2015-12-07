import $     from 'jquery';
import THREE from 'three';
import TWEEN from 'tween.js';

export default class ProjectSphere {

	constructor(data, scene, camera) {

		this.data   = data;
		this.scene  = scene;
		this.camera = camera;
		this.el     = $('#three-viewport');
		this.win    = $(window);

		this.raycaster  = null;
		this.camera_pos = null;

		this.pos = {
			x: 0,
			y: 0
		};

		this.spheres     = null;
		this.intersected = null;

		this.raycaster  = new THREE.Raycaster();
		this.camera_pos = new THREE.Vector3();

		this.bind();
		this.createProjects();

	}
		

	bind() {
		
		this.el.on('mousemove touchmove', this.sceneMouseMove.bind(this));
		this.el.on('mousedown touchstart', this.projectMouseDown.bind(this));

	}


	unbind() {
		
		this.el.off('mousemove touchmove', this.sceneMouseMove.bind(this));
		this.el.off('mousedown touchstart', this.projectMouseDown.bind(this));

	}


	createProjects() {

		this.spheres = []

		const target   = new THREE.Vector3();
		const geometry = new THREE.SphereGeometry(3000, 16, 16, 4.4, 0.6, -1.725, 0.35);

		Object.keys(this.data).forEach((key, index) => {

			const texture     = THREE.ImageUtils.loadTexture(this.data[key].assets[0].src)
			texture.minFilter = THREE.LinearFilter;
			texture.flipY     = false;

			const material = new THREE.MeshBasicMaterial({
				map         : texture,
				transparent : true,
				opacity     : 0.5
			});

			const project = new THREE.Mesh(geometry, material);

			project.scale.x       = -1;
			project.material.side = THREE.DoubleSide;
			project.name          = 'project';
			project.title         = this.data[key].title;
			project.url           = this.data[key].url;

			const x = Math.cos(2 * Math.PI * index / 6) * 400;
			const z = Math.sin(2 * Math.PI * index / 6) * 400;

			project.position.set(x, 0, z)
			project.lookAt(target);

			this.spheres.push(project);
			this.scene.add(project);

		});

	}


	fadeInProject(object) {

		const tween = new TWEEN.Tween(object.material);
		tween.to({ opacity: 1 }, 750);
		tween.easing(TWEEN.Easing.Sinusoidal.Out);
		tween.start();

	}


	fadeOutProject(object) {

		const tween = new TWEEN.Tween(object.material);
		tween.to({ opacity: 0.5 }, 750);
		tween.easing(TWEEN.Easing.Sinusoidal.Out);
		tween.start();

	}


	sceneMouseMove(event) {

		const evt = {
			x: event.pageX || event.originalEvent.touches[ 0 ].pageX,
			y: event.pageY || event.originalEvent.touches[ 0 ].pageY
		}

		this.pos = {
			x:   ( evt.x / this.win.width()  ) * 2 - 1,
			y: - ( evt.y / this.win.height() ) * 2 + 1
		};

	}


	projectMouseDown(event) {

		const evt = {
			x: event.pageX || event.originalEvent.touches[ 0 ].pageX,
			y: event.pageY || event.originalEvent.touches[ 0 ].pageY
		};

		this.pos = {
			x:   ( evt.x / this.win.width()  ) * 2 - 1,
			y: - ( evt.y / this.win.height() ) * 2 + 1
		};

		const intersects = this.raycaster.intersectObjects(this.spheres);

		if(intersects.length > 0) {

			this.controller.go(intersects[ 0 ].object.url);

		}

	}


	projectMouseOver() {

		$('#home h1').html(this.intersected.title);

		TweenMax.to($('#home h1'), 0.5, { autoAlpha: 1, y: -10, scale: 1 });
		
		this.fadeInProject(this.intersected);

		this.el.css({ cursor: 'pointer' });

	}

	
	projectMouseOut() {

		if(this.intersected) {
			
			this.fadeOutProject(this.intersected);

			this.el.css({ cursor: 'ew-resize' });

			TweenMax.to($('#home h1'), 0.5, { autoAlpha: 0, y: 0, scale: 0.9 });

		}

	}


	update() {

		// taking the camera's world position into consideration
		this.camera_pos.setFromMatrixPosition(this.camera.matrixWorld)

		this.raycaster.ray.origin.copy(this.camera_pos)

		this.raycaster.ray.direction
			.set(this.pos.x, this.pos.y, 0)
			.unproject(this.camera)
			.sub(this.camera_pos)
			.normalize();

		const intersects = this.raycaster.intersectObjects(this.spheres);

		if(intersects.length > 0) {

			this.intersected = intersects[ 0 ].object;

			if(!this.win.width() < 768) {
			
				this.projectMouseOver();

			}

		} else {

			if(!this.win.width() < 768) {

				this.projectMouseOut();

			}

			this.intersected = null;

		}

	}

}
