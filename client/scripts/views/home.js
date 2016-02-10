import Win from 'app/utils/window';
import RAF from 'app/utils/raf';
import Transitions from 'app/utils/transitions';
import Request from 'app/utils/request';
import Renderer from 'app/components/renderer';
import Scene from 'app/components/scene';
import Camera from 'app/components/camera';
import ProjectSphere from 'app/components/projectSphere';
import ParticleSystem from 'app/components/particleSystem';
import Controls from 'app/components/pivotControls';

const Home = {

  $el: null,
  introComplete: false,

  init: function init() {

    Happens(this);

    this.$el = $('#three-viewport');
    this.$el.append(Renderer.domElement);

    ParticleSystem.init();
    Controls.init();

    this.renderProjects();
    this.runIntro();

    RAF.start();

    this.bind();

  },

  bind: function bind() {

    Win.on('resize', this.resize.bind(this));
    RAF.on('tick', this.update.bind(this));

  },

  renderProjects: function renderProjects() {

    Request.get('api/posts').then(response => {

      const data = JSON.parse(response).filter(item => {

        return item.state === 'published';

      });

      ProjectSphere.init(this.$el, data);

    });

  },

  runIntro: function runIntro() {

    Transitions.on('flyover:complete', () => {

      this.introComplete = true;

    });

    Transitions.introFlyover(Camera, Controls);

  },

  resize: function resize() {

    Renderer.setSize(Win.width, Win.height);

    Camera.aspect = Win.width / Win.height;

  },

  update: function update() {

    Renderer.render(Scene, Camera);

    Camera.updateProjectionMatrix();
    Camera.lookAt(Scene.position);

    if (this.introComplete) Controls.update();

    ParticleSystem.update();
    ProjectSphere.update();

  },

  destroy: function destroy() {

    Controls.unbind();
    ProjectSphere.unbind();

    RAF.stop();

  },

};

export default Home;
