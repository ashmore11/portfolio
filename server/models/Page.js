var keystone = require('keystone');

var Types = keystone.Field.Types;

var page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true,
	}
});

page.add({
	meta:{
		title: { type: Types.Text },
		description: { type: Types.Text },
		keywords: { type: Types.Text },
		og: {
			title: { type: Types.Text },
			description: { type: Types.Text },
			image: { type: Types.Text },
			url: { type: Types.Url },
			type: { type: Types.Text }
		}
	},
	title: {
		type: Types.Text,
		required: true
	},
	description: {
		type: Types.Textarea,
		initial: false,
		required: false
	},
});

page.defaultColumns = 'title';
page.register();
