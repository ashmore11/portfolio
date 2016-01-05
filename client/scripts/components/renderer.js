import Win    from 'app/utils/window';
import Camera from 'app/components/camera';
import Scene  from 'app/components/scene';

const Renderer = {

  obj: new THREE.WebGLRenderer({ antialias: true }),

};

Renderer.init = function init() {

  this.obj.setSize(Win.width, Win.height);
  this.obj.setClearColor(0x000000);

};

Renderer.resize = function resize() {

  this.obj.setSize(Win.width, Win.height);

};

Renderer.update = function update() {

  this.obj.render(Scene.obj, Camera.obj);

};

export default Renderer;