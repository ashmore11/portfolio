const Transitions = {

  init: function init() {

    Happens(this);

  },

  fadeIn: function fadeIn(el, duration) {

    TweenMax.set(el, { autoAlpha: 0 });

    const params = {
      autoAlpha: 1,
      ease: Power2.easeInOut,
    };

    TweenMax.to(el, duration, params);

  },

  fadeOut: function fadeOut(el, duration, callback) {

    const params = {
      autoAlpha: 0,
      ease: Power2.easeOut,
      onComplete: () => {
        callback();
      },
    };

    TweenMax.to(el, duration, params);

  },

  introFlyover: function introFlyover(camera, controls) {

    let params;

    camera.position.set(0, 3500, 7000);

    params = {
      y: 25,
      easing: Expo.easeInOut,
    };

    TweenMax.to(camera.position, 5, params);

    params = {
      z: 1000,
      easing: Expo.easeInOut,
    };

    TweenMax.to(camera.position, 7, params);

    params = {
      y: Math.PI * 1.055,
      easing: Expo.easeInOut,
      onComplete: () => {
        this.emit('flyover:complete');
      },
    };

    TweenMax.to(controls.pivot.rotation, 7, params);

  },

};

Transitions.init();

export default Transitions;
