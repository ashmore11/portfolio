const About = {

  $el: $('#about'),

};

About.init = function init() {

	Happens(this);

  console.log('init ABOUT');

  this.emit('view:ready');

};

About.destroy = function destroy() {

  console.log('destroy ABOUT');

};

export default About;
