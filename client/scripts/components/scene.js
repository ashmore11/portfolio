const Scene = {

  obj: new THREE.Scene(),
  fog: new THREE.Fog(0x000000, 10, 10000),

};

Scene.init = function init() {

  this.obj.fog = this.fog;

};

Scene.init();

export default Scene;