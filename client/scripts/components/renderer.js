import Win from 'app/utils/window';

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor(0x000000);
renderer.setSize(Win.width, Win.height);

export default renderer;