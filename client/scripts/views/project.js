import $ from 'jquery';

const Project = {

  $el: $('#project'),

};

Project.init = function init() {

  console.log('init PROJECT');

};

Project.destroy = function destroy() {

  console.log('destroy PROJECT');

};

export default Project;