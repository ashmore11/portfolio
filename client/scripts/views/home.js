import Win            from 'app/utils/window';
import RAF            from 'app/utils/raf';
import Transitions    from 'app/utils/transitions';
import Renderer       from 'app/components/renderer';
import Scene          from 'app/components/scene';
import Camera         from 'app/components/camera';
import ProjectSphere  from 'app/components/projectSphere';
import ParticleSystem from 'app/components/particleSystem';
import Controls       from 'app/components/pivotControls';

const Home = {

  $el: null,
  introComplete: false,

};

Home.init = function init() {

  Happens(this);

  this.$el = $('#three-viewport');
  this.$el.append(Renderer.domElement);
  
  Controls.init();
  ProjectSphere.init();
  ParticleSystem.init();
  
  Transitions.on('flyover:complete', () => {
    this.introComplete = true;
  });
  Transitions.introFlyover(Camera, Controls);

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
  Camera.lookAt(Scene.position);
  
  if (this.introComplete) Controls.update();
  
  ParticleSystem.update();
  ProjectSphere.update();

};

Home.destroy = function destroy() {

  Controls.unbind();
  ProjectSphere.unbind();

  RAF.stop();

};

export default Home;
