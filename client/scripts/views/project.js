const Project = {

  $el: $('#project'),

  init: function init() {

    Happens(this);

    console.log('init PROJECT');

    this.emit('view:ready');

  },

  destroy: function destroy() {

    console.log('destroy PROJECT');

  },

};

export default Project;
