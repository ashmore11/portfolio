var keystone = require('keystone');

var Types = keystone.Field.Types;

var Pages = new keystone.List('page', {
	map: { name: 'title' },
	autokey: { 
		path: 'slug', 
		from: 'title', 
		unique: true 
	}
});

Pages.add({
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

Pages.defaultColumns = 'title';
Pages.register();
