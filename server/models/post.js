var keystone = require('keystone');
var types    = keystone.Field.Types;

var post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { 
    path: 'slug', 
    from: 'title', 
    unique: true 
  }
});

post.add({
  createdOn: {
    type: Date, 
    default: Date.now 
  },
  state: {
    type: types.Select,
    options: ['draft', 'published'],
    default: 'draft',
    initial: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    initial: true
  },
  description: {
    type: types.Html,
    wysiwyg: true,
    height: 300,
    initial: false,
    required: false
  },
  featuredImage: {
    type: types.CloudinaryImage,
    required: true,
    initial: false
  },
  images: {
    type: types.CloudinaryImages,
    required: false,
    initial: false
  },
  video: {
    type: types.Url,
    required: false
  }
});

post.defaultColumns = 'title, state, createdOn';
post.register();
