import Win            from 'app/utils/window';
import RAF            from 'app/utils/raf';
import Renderer       from 'app/components/renderer';
import Scene          from 'app/components/scene';
import Camera         from 'app/components/camera';
import ProjectSphere  from 'app/components/projectSphere';
import ParticleSystem from 'app/components/particleSystem';
import PivotControls  from 'app/components/pivotControls';

const Home = {

  $el: null

};

Home.init = function init() {

	Happens(this);

	RAF.start();

	this.$el = $('#three-viewport');
	this.$el.append(Renderer.obj.domElement);

	Scene.init();
	Camera.init();
	Renderer.init();
  
  ProjectSphere.init();
  PivotControls.init();
  ParticleSystem.init();
  
  Camera.obj.position.set(0, 25, 1000);

  this.bind();

};

Home.bind = function bind() {

	Win.on('resize', this.resize.bind(this));
  RAF.on('tick',   this.update.bind(this));

};

Home.runIntroFlyover = function runIntroFlyover() {

  let params;

  Camera.obj.position.set(0, 2500, 5000);

  params = {
    y: 25,
    easing: Sine.easeInOut,
  };

  TweenMax.to(Camera.obj.position, 5, params);

  params = {
    z: 1000,
    easing: Sine.easeInOut,
  };

  TweenMax.to(Camera.obj.position, 6.5, params);

};

Home.resize = function resize() {

	Camera.resize();
	Renderer.resize();

};

Home.update = function update() {
  
  Renderer.update();
  PivotControls.update();
  ParticleSystem.update();
  ProjectSphere.update();

};

Home.destroy = function destroy() {

  ProjectSphere.unbind();
  PivotControls.unbind();

  RAF.stop();

};

export default Home;
