import $             from 'jquery';
import THREE         from 'three';
import TWEEN         from 'tween.js';
import TM            from 'gsap';
import Win           from 'app/utils/window';
import TextureLoader from 'app/utils/textureLoader';
import Nav           from 'app/utils/navigation';

const ProjectSphere = {

	$el: null,

	data: null,
	scene: null,
	camera: null,

	pos: {},
	spheres: [],
	intersected: null,
	raycaster: new THREE.Raycaster,
	camera_pos: new THREE.Vector3,

	project: {
		radiusTop: 3000,
		radiusBottom: 3000,
		height: 1200,
		radiusSegments: 16,
		heightSegments: 16,
		openEnded: true,
		thetaStart: 0,
		thetaLength: Math.PI / 4.5,
	},

};

ProjectSphere.init = function init(data, scene, camera) {

	this.$el = $('#three-viewport');

	this.data   = data;
	this.scene  = scene;
	this.camera = camera;

	this.bind();
	this.createProjects();

}

ProjectSphere.bind = function bind() {
	
	this.$el.on('mousemove touchmove', this.sceneMouseMove.bind(this));
	this.$el.on('mousedown touchstart', this.projectMouseDown.bind(this));

}

ProjectSphere.unbind = function unbind() {
	
	this.$el.off('mousemove touchmove');
	this.$el.off('mousedown touchstart');

}

ProjectSphere.createProjects = function createProjects() {

	const target   = new THREE.Vector3();
	const geometry = new THREE.CylinderGeometry(
		this.project.radiusTop,
		this.project.radiusBottom,
		this.project.height,
		this.project.radiusSegments,
		this.project.heightSegments,
		this.project.openEnded,
		this.project.thetaStart,
		this.project.thetaLength
	)

	this.data.forEach((item, index) => {

		const texture = TextureLoader(item.featuredImage.url);
		
		texture.minFilter = THREE.LinearFilter;

		const material = new THREE.MeshBasicMaterial({
			map         : texture,
			transparent : true,
			opacity     : 0.5,
			wireframe   : false
		});

		const project = new THREE.Mesh(geometry, material);

		project.scale.x       = -1;
		project.material.side = THREE.DoubleSide;
		project.name          = 'project';
		project.title         = item.title;
		project.url           = `/project/${item.slug}`;

		const x = Math.cos(index * ( Math.PI * 2 ) / this.data.length);
		const z = Math.sin(index * ( Math.PI * 2 ) / this.data.length);

		project.position.set(x, 0, z)
		project.lookAt(target);

		this.spheres.push(project);
		this.scene.add(project);

	});

}

ProjectSphere.fadeInProject = function fadeInProject(object) {

	const tween = new TWEEN.Tween(object.material);
	tween.to({ opacity: 1 }, 750);
	tween.easing(TWEEN.Easing.Sinusoidal.Out);
	tween.start();

}

ProjectSphere.fadeOutProject = function fadeOutProject(object) {

	const tween = new TWEEN.Tween(object.material);
	tween.to({ opacity: 0.5 }, 750);
	tween.easing(TWEEN.Easing.Sinusoidal.Out);
	tween.start();

}

ProjectSphere.sceneMouseMove = function sceneMouseMove(event) {

	const evt = {
		x: event.pageX || event.originalEvent.touches[0].pageX,
		y: event.pageY || event.originalEvent.touches[0].pageY
	}

	this.pos.x = ( evt.x / Win.width  ) * 2 - 1;
	this.pos.y = - ( evt.y / Win.height ) * 2 + 1;

}

ProjectSphere.projectMouseDown = function projectMouseDown(event) {

	const evt = {
		x: event.pageX || event.originalEvent.touches[0].pageX,
		y: event.pageY || event.originalEvent.touches[0].pageY
	};

	this.pos.x = (evt.x / Win.width) * 2 - 1;
	this.pos.y = - (evt.y / Win.height) * 2 + 1;

	const intersects = this.raycaster.intersectObjects(this.spheres);

	if(intersects.length > 0) {

		Nav.go(intersects[0].object.url);

	}

}

ProjectSphere.projectMouseOver = function projectMouseOver() {

	$('#home h1').html(this.intersected.title);

	TM.to($('#home h1'), 0.5, { autoAlpha: 1, y: -10, scale: 1 });
	
	this.fadeInProject(this.intersected);

	this.$el.css({ cursor: 'pointer' });

}

ProjectSphere.projectMouseOut = function projectMouseOut() {

	if(this.intersected) {
		
		this.fadeOutProject(this.intersected);

		this.$el.css({ cursor: 'ew-resize' });

		TM.to($('#home h1'), 0.5, { autoAlpha: 0, y: 0, scale: 0.9 });

	}

}

ProjectSphere.update = function update() {

	// taking the camera's world position into consideration
	this.camera_pos.setFromMatrixPosition(this.camera.matrixWorld);

	this.raycaster.ray.origin.copy(this.camera_pos);

	this.raycaster.ray.direction
		.set(this.pos.x, this.pos.y, 0)
		.unproject(this.camera)
		.sub(this.camera_pos)
		.normalize();

	const intersects = this.raycaster.intersectObjects(this.spheres);

	if(intersects.length > 0) {

		this.intersected = intersects[0].object;

		if (!Win.width < 768) this.projectMouseOver();

	} else {

		if (!Win.width < 768) this.projectMouseOut();

		this.intersected = null;

	}

}

export default ProjectSphere;
