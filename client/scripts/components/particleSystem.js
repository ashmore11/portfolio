import TextureLoader from 'app/utils/textureLoader';
import Scene from 'app/components/scene';

const ParticleSystem = {

  geometry: new THREE.Geometry(),
  materials: [],
  particles: [],
  count: 5000,
  parameters: [
    [[1, 1, 0.5], 5],
    [[0.95, 1, 0.5], 4],
    [[0.90, 1, 0.5], 3],
    [[0.85, 1, 0.5], 2],
    [[0.80, 1, 0.5], 1],
  ],

  init: function init() {

    this.pushVertices();

    this.createParticles();

  },

  pushVertices: function pushVertices() {

    _.times(this.count, () => {

      const vertex = new THREE.Vector3();

      vertex.x = Math.random() * 8000 - 4000;
      vertex.y = Math.random() * 8000 - 4000;
      vertex.z = Math.random() * 8000 - 4000;

      this.geometry.vertices.push(vertex);

    });

  },

  createParticles: function createParticles() {

    this.parameters.map((item, index) => {

      const size = item[1];

      this.materials[index] = new THREE.PointsMaterial({
        size,
        map: TextureLoader('images/_tmp/particle.jpg'),
        blending: THREE.NormalBlending,
        transparent: true,
      });

      const particle = new THREE.Points(this.geometry, this.materials[index]);

      particle.rotation.x = Math.random() * 6;
      particle.rotation.y = Math.random() * 6;
      particle.rotation.z = Math.random() * 6;

      this.particles.push(particle);

      Scene.add(particle);

    });

  },

  update: function update() {

    const time = Date.now() * 0.00001;

    this.particles.map((item, index) => {

      item.rotation.y = time * (index < 4 ? index + 1 : - (index + 1));

    });

  },

};

export default ParticleSystem;
