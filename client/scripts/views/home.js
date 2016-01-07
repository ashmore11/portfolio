import Win            from 'app/utils/window';
import RAF            from 'app/utils/raf';
import Transitions    from 'app/utils/transitions';
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

  this.$el = $('#three-viewport');
  this.$el.append(Renderer.domElement);
  
  ProjectSphere.init();
  PivotControls.init();
  ParticleSystem.init();

  Transitions.introFlyover(Camera);

  RAF.start();

  this.bind();

};

Home.bind = function bind() {

  Win.on('resize', this.resize.bind(this));
  RAF.on('tick',   this.update.bind(this));

};

Home.resize = function resize() {

  Renderer.setSize(Win.width, Win.height);

  Camera.aspect = Win.width / Win.height;

};

Home.update = function update() {

  Renderer.render(Scene, Camera);

  Camera.updateProjectionMatrix();
  
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
