import $ from 'jquery';

const About = {

  $el: $('#about'),

};

About.init = function init() {

  console.log('init ABOUT');

};

About.destroy = function destroy() {

  console.log('destroy ABOUT');

};

export default About;