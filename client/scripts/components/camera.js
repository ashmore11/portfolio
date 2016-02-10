import Win from 'app/utils/window';

const fov = 50;
const aspect = Win.width / Win.height;
const near = 0.1;
const far = 10000;

const camera = new THREE.PerspectiveCamera(
  fov,
  aspect,
  near,
  far
);

camera.position.set(0, 25, 1000);

export default camera;
