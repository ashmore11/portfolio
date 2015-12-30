import Happens from 'happens';
import TM      from 'gsap';

const Transitions = {

  init: function init() {

    Happens(this);

  },

  fadeIn: function fadeIn(el, duration) {

    const params = {
      autoAlpha: 1,
      ease: Power2.easeInOut,
      onComplete: () => {
        this.emit('fadeIn:complete');
      },
    };

    this.tween(el, duration, params);

  },

  fadeOut: function fadeOut(el, duration) {

    const params = {
      autoAlpha: 0,
      ease: Power2.easeOut,
      onComplete: () => {
        this.emit('fadeOut:complete');
      },
    };

    this.tween(el, duration, params);

  },

  tween: function tween(el, duration, params) {

    TM.to(
      el, 
      duration, 
      params
    );

  }

};

Transitions.init();

export default Transitions;