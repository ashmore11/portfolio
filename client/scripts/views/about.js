const About = {

  $el: $('#about'),

  init: function init() {

    Happens(this);

    console.log('init ABOUT');

    this.emit('view:ready');

  },

  destroy: function destroy() {

    console.log('destroy ABOUT');

  },

};

export default About;
