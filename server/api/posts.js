var keystone = require('keystone');
var Post     = keystone.list('Post');

/**
 * Get Post by Slug
 */
exports.get = function(req, res) {

  Post.model.find().exec(function(err, item) {
    
    if(err) {
      return res.apiError('database error', err);
    }

    if(!item) {
      return res.apiError('not found');
    }

    res.apiResponse(item);
    
  });

}