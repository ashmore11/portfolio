import THREE from 'three';

export default class ParticleSystem {

	constructor(scene) {
		
		this.geometry   = null;
		this.materials  = null;
		this.particles  = null;
		this.count      = null;
		this.parameters = null;

		this.scene = scene;

		this.geometry  = new THREE.Geometry();
		this.materials = [];
		this.particles = [];
		this.count     = 5000;

		for(let i = 0; i < this.count; i++) {

			const vertex = new THREE.Vector3();

			vertex.x = Math.random() * 8000 - 4000;
			vertex.y = Math.random() * 8000 - 4000;
			vertex.z = Math.random() * 8000 - 4000;

			this.geometry.vertices.push(vertex);

		}

		this.parameters = [
			[ [1, 1, 0.5], 5 ],
			[ [0.95, 1, 0.5], 4 ],
			[ [0.90, 1, 0.5], 3 ],
			[ [0.85, 1, 0.5], 2 ],
			[ [0.80, 1, 0.5], 1 ]
		];

		for(let i = 0; i < this.parameters.length; i++) {

			const size = this.parameters[i][1];

			this.materials[ i ] = new THREE.PointCloudMaterial({
				size        : size,
				map         : THREE.ImageUtils.loadTexture('images/_tmp/particle.jpg'),
				blending    : THREE.NormalBlending,
				transparent : true
			});

			const particle = new THREE.PointCloud(this.geometry, this.materials[i]);

			particle.rotation.x = Math.random() * 6;
			particle.rotation.y = Math.random() * 6;
			particle.rotation.z = Math.random() * 6;

			this.particles.push(particle);

			this.scene.add(particle);

		}

	}

	
	update() {

		const time = Date.now() * 0.00002;

		for(let i = 0; i < this.particles.length; i++) {

			const object = this.particles[i];

			object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));

		}

	}

}
