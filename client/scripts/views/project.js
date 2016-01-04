const Project = {

  $el: $('#project'),

};

Project.init = function init() {

	Happens(this);

  console.log('init PROJECT');

  this.emit('view:ready');

};

Project.destroy = function destroy() {

  console.log('destroy PROJECT');

};

export default Project;
