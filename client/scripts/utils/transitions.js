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

};

Transitions.init();

export default Transitions;
