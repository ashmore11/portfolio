import $              from 'jquery';
import THREE          from 'three';
import TWEEN          from 'tween.js';
import Win            from 'app/utils/window';
import ProjectSphere  from 'app/components/projectSphere';
import ParticleSystem from 'app/components/particleSystem';
import OrbitControls  from 'app/components/orbitControls';
import GET            from 'app/utils/request';

const Home = {

  $el: $('#three-viewport'),

  projectSphere: ProjectSphere,
  controls: OrbitControls,
  particles: ParticleSystem,

};

Home.init = function init() {

  const host = window.location.origin;
  const url  = `${host}/api/posts`;

  GET(url).then(response => {

    this.data = JSON.parse(response).filter(item => {

      return item.state === 'published';
      
    })

    this.initScene();
  
  });

};

Home.initScene = function initScene() {

  this.scene     = new THREE.Scene();
  this.scene.fog = new THREE.Fog(0x000000, 10, 10000);

  this.camera = new THREE.PerspectiveCamera(50, Win.width / Win.height, 0.1, 10000);
  
  this.projectSphere.init(this.data, this.scene, this.camera);
  this.controls.init(this.scene, this.camera);
  this.particles.init(this.scene);
  
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setSize(Win.width, Win.height);
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

  Win.on('resize', this.resize.bind(this));

};

Home.unbind = function unbind() {

  // unbind logic

};

Home.animateCameraPos = function animateCameraPos() {

  this.camera.position.set(0, 2500, 5000);
  this.controls.pos.x = -0.00025;

  let tween;

  tween = new TWEEN.Tween(this.camera.position);
  tween.to({ y: 25 }, 5000);
  tween.easing(TWEEN.Easing.Sinusoidal.InOut);
  tween.onComplete(() => { this.camTweenComplete = true; });
  tween.start();

  tween = new TWEEN.Tween(this.camera.position);
  tween.to({ z: 1000 }, 6500);
  tween.easing(TWEEN.Easing.Sinusoidal.InOut);
  tween.start();

};

Home.resize = function resize() {

  this.renderer.setSize(Win.width, Win.height);
  this.camera.aspect = Win.width / Win.height;
  
  this.camera.updateProjectionMatrix();

};

Home.render = function render() {
  
  this.RAF = requestAnimationFrame(this.render.bind(this));

  this.renderer.render(this.scene, this.camera);
  
  this.update();

};

Home.update = function update() {
  
  TWEEN.update();
  
  this.controls.update();
  this.particles.update();
  this.projectSphere.update();

};

Home.destroy = function destroy() {

  this.projectSphere.unbind();
  this.controls.unbind();
  this.unbind();

  cancelAnimationFrame(this.RAF);
  this.RAF = null;

};

export default Home;