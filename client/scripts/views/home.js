import $              from 'jquery';
import THREE          from 'three';
import TWEEN          from 'tween.js';
import Happens        from 'happens';
import ProjectSphere  from 'app/components/projectSphere';
import ParticleSystem from 'app/components/particleSystem';
import OrbitControls  from 'app/components/orbitControls';

export default class Home {
	
	constructor() {

    Happens(this);

    this.$el = $('#three-viewport');
    this.win = $(window);

    $.get('json/data.json', data => {

    	this.data = data;
    	this.init();

    });

  }

  init() {

    this.scene     = new THREE.Scene();
    this.camera    = new THREE.PerspectiveCamera(50, this.win.width() / this.win.height(), 0.1, 10000);
    this.scene.fog = new THREE.Fog(0x000000, 10, 10000);
    this.controls  = new OrbitControls(this.scene, this.camera);
    this.particles = new ParticleSystem(this.scene);
    this.projects  = new ProjectSphere(this.data, this.scene, this.camera);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.$el.append(this.renderer.domElement);

    this.scene.add(this.camera);
    
    this.cam_tween_complete = true;
    this.camera.position.set(0, 25, 1000);
    this.controls.pos.x = -0.00025;

    this.animate();

  }

  bind() {

    this.win.on('resize', this.resize.bind(this));

  }

  animate_camera_pos() {

    this.camera.position.set(0, 2500, 5000);
    this.controls.pos.x = -0.00025;

    let tween;

    tween = new TWEEN.Tween(this.camera.position);
    tween.to({ y: 25 }, 5000);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.onComplete(() => { this.cam_tween_complete = true; });
    tween.start();

    tween = new TWEEN.Tween(this.camera.position);
    tween.to({ z: 1000 }, 6500);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start();

  }

  resize() {

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    
    this.camera.updateProjectionMatrix();

  }

  animate() {
    
    this.RAF = requestAnimationFrame(this.animate.bind(this));
    
    this.update();

  }

  update() {

    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
    
    if (this.cam_tween_complete) {

      this.controls.update();

    }
    
    this.controls.watchTarget();
    this.particles.update();
    this.projects.update();
  
  }

  destroy() {

    this.projects.unbind();
    this.controls.unbind();
    this.unbind();
    cancelAnimationFrame(this.RAF);
    this.RAF = null;

  }

}
