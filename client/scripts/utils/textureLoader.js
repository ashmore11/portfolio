const TextureLoader = function TextureLoader(url) {

  const loader = new THREE.TextureLoader();

  loader.crossOrigin = '';

  return loader.load(url, texture => {

    return texture;

  });

};

export default TextureLoader;
