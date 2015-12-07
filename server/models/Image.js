var keystone = require('keystone');

var Types = keystone.Field.Types;

var Image = new keystone.List('images', {
  map: { name: 'title' },
  autokey: { 
    path: 'slug', 
    from: 'title', 
    unique: true 
  }
});

Image.add({
  title: {
    type: String,
    required: true,
    initial: true
  },
  image: {
    require: true,
    initial: false,
    type: Types.LocalFile,
    dest: process.env.PWD + '/public/images/uploads/'
  },
  description: {
    type: Types.Html,
    wysiwyg: true,
    height: 200,
    required: false,
    initial: false
  }
});

Image.defaultColumns = 'title';
Image.register();
