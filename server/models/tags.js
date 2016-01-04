var keystone = require('keystone');

var tags = new keystone.List('Tags', {
	map: { name: 'tag' },
	autokey: {
		path: 'slug', 
		from: 'tag', 
		unique: true 
	},
	sortable: true
});

tags.add({
	tag: {
		type: String,
		initial: true,
		required: true
	}
});

tags.relationship({
	path: 'posts', 
	ref: 'Post', 
	refPath: 'tags'
});

tags.defaultColumns = 'tag';
tags.register();
