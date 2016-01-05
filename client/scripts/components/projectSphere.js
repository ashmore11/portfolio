import Win           from 'app/utils/window';
import TextureLoader from 'app/utils/textureLoader';
import Nav           from 'app/utils/navigation';
import Request       from 'app/utils/request';
import Scene         from 'app/components/scene';
import Camera        from 'app/components/camera';

const ProjectSphere = {

  $el: null,
  data: null,
  pos: {},
  projects: [],
  intersected: null,
  raycaster: new THREE.Raycaster,
  camera_pos: new THREE.Vector3,
  projectMouseOver: false,
  cylinder: {
    radiusTop: 3000,
    radiusBottom: 3000,
    height: 1200,
    radiusSegments: 16,
    heightSegments: 16,
    openEnded: true,
    thetaStart: 0,
    thetaLength: (Math.PI * 2) / 6.5,
  },

};

ProjectSphere.init = function init(data) {

  this.$el = $('#three-viewport');

  const url = `${window.location.origin}/api/posts`;

  this.getData(url);

  this.bind();

};

ProjectSphere.getData = function getData(url) {

  Request.get(url).then(response => {

    // this.data = JSON.parse(response).filter(item => {

    //   return item.state === 'published';

    // });

    this.data = [0,1,2,3,4,5];

    this.createProjects();
  
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

  const target   = new THREE.Vector3();
  const geometry = new THREE.CylinderGeometry(
    this.cylinder.radiusTop,
    this.cylinder.radiusBottom,
    this.cylinder.height,
    this.cylinder.radiusSegments,
    this.cylinder.heightSegments,
    this.cylinder.openEnded,
    this.cylinder.thetaStart,
    this.cylinder.thetaLength
  );

  this.data.forEach((item, index) => {

    // const texture = TextureLoader(item.featuredImage.url);
    
    // texture.minFilter = THREE.LinearFilter;

    const material = new THREE.MeshBasicMaterial({
      // map         : texture,
      transparent : true,
      opacity     : 0.5,
      wireframe   : true
    });

    const project = new THREE.Mesh(geometry, material);

    project.scale.x       = -1;
    project.material.side = THREE.DoubleSide;
    project.name          = 'project';
    // project.title         = item.title;
    // project.url           = `/project/${item.slug}`;

    const x = Math.cos(index * ( Math.PI * 2 ) / this.data.length);
    const z = Math.sin(index * ( Math.PI * 2 ) / this.data.length);

    project.position.set(x, 0, z)
    project.lookAt(target);

    this.projects.push(project);
    Scene.obj.add(project);

  });

};

/**
 * Mouse move over the scene
 */
ProjectSphere.mouseMove = function mouseMove(event) {

  const evt = {
    x: event.pageX || event.originalEvent.touches[0].pageX,
    y: event.pageY || event.originalEvent.touches[0].pageY,
  }

  this.pos.x = ( evt.x / Win.width  ) * 2 - 1;
  this.pos.y = - ( evt.y / Win.height ) * 2 + 1;

};

/**
 * Mouse down on a project
 */
ProjectSphere.mouseDown = function mouseDown(event) {

  const evt = {
    x: event.pageX || event.originalEvent.touches[0].pageX,
    y: event.pageY || event.originalEvent.touches[0].pageY
  };

  this.pos.x = (evt.x / Win.width) * 2 - 1;
  this.pos.y = - (evt.y / Win.height) * 2 + 1;

  const intersects = this.raycaster.intersectObjects(this.projects);

  if(intersects.length > 0) {

    Nav.go(intersects[0].object.url);

  }

};

/**
 * Mouse over a project
 */
ProjectSphere.mouseOver = function mouseOver() {

  this.projectMouseOver = true;

  const title    = $('#home h1');
  const material = this.intersected.material;

  let params;

  this.$el.css({ cursor: 'pointer' });

  title.html(this.intersected.title);

  params = {
    autoAlpha: 1, 
    y: -10, 
    scale: 1,
  };

  TweenMax.to(title, 0.5, params);

  params = {
    opacity: 0.75, 
    easing: Sine.easeOut,
  };
  
  TweenMax.to(material, 0.75, { opacity: 1 });

};

/**
 * Mouse out of a project
 */
ProjectSphere.mouseOut = function mouseOut() {

  this.projectMouseOver = false;

  const title    = $('#home h1');
  const material = this.intersected.material;

  let params;

  this.$el.css({ cursor: 'ew-resize' });

  params = {
    autoAlpha: 0,
    y: 0,
    scale: 0.9,
  };

  TweenMax.to(title, 0.5, params);

  params = {
    opacity: 0.5, 
    easing: Sine.easeOut,
  };
    
  TweenMax.to(material, 0.75, params);

};

ProjectSphere.update = function update() {

  // taking the camera's world position into consideration
  this.camera_pos.setFromMatrixPosition(Camera.obj.matrixWorld);

  this.raycaster.ray.origin.copy(this.camera_pos);

  this.raycaster.ray.direction
    .set(this.pos.x, this.pos.y, 0)
    .unproject(Camera.obj)
    .sub(this.camera_pos)
    .normalize();

  const intersects = this.raycaster.intersectObjects(this.projects);

  if(intersects.length > 0) {

    this.intersected = intersects[0].object;

    if (!Win.width < 768 && !this.projectMouseOver) this.mouseOver();

  } else {

    if (!Win.width < 768 && this.intersected) this.mouseOut();

    this.intersected = null;

  }

};

export default ProjectSphere;
