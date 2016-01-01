var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view   = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'project';

  var page = keystone.list('Page');
  var post = keystone.list('Post');

  view.query('page', page.model.findOne({ slug: 'project' }));
  view.query('post', post.model.findOne({ slug: req.params.id }));

  console.log(post.model.findOne({ slug: req.params.id }));
  
  view.render('project');
  
};
