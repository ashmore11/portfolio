import Win from 'app/utils/window';

let fov    = 55;
let aspect = Win.width / Win.height;
let near   = 0.1;
let far    = 10000;

const camera = new THREE.PerspectiveCamera(
  fov,
  aspect,
  near,
  far
);

camera.position.set(0, 25, 1000);

export default camera;