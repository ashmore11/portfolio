import Win   from 'app/utils/window';
import Scene from 'app/components/scene';

const Camera = {

  fov: 55,
  aspect: Win.width / Win.height,
  near: 0.1,
  far: 10000,
  obj: null

};

Camera.init = function init() {

  this.obj = new THREE.PerspectiveCamera(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );

  Scene.obj.add(this.obj);

};

Camera.resize = function resize() {

  this.obj.aspect = Win.width / Win.height;
  
  this.obj.updateProjectionMatrix();

};

export default Camera;