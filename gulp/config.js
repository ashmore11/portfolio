export default {
	/**
	 * Environment variables
	 */
	env: {
		production: process.env.NODE_ENV === 'production',
		development: process.env.NODE_ENV === 'development',
		basepath: process.env.PWD
	},

	/**
	 * Paths
	 */
	paths: {
		vendor: {
			destination: './public/js/',
			filename: 'vendor.js',
		},
		scripts: {
			source: './client/scripts/app.js',
			watch: './client/scripts/**/*.js',
			destination: './public/js/',
			filename: 'app.js',
		},
		styles: {
			source: './client/styles/app.styl',
			watch: 'client/styles/**/*.styl',
			destination: './public/css/'
		},
		templates: {
			watch: './client/templates/**/*.jade'
		}
	},

	/**
	 * Nodemon
	 */
	nodemon: {
		script: 'keystone.js',
		ignore: [
			'gulp',
			'public',
			'client',
			'node_modules',
			'bower_components',
			'package.json',
			'bower.json',
		],
	},

	/**
	 * Eslint
	 */
	eslint: {
    extends: 'airbnb/base',
    rules: {
      'padded-blocks': [2, 'always'],
      'no-param-reassign': [2, { 'props': false }],
      'new-cap': [2, {'capIsNewExceptions': ['Happens', 'TextureLoader'] }],
      'no-console': 0,
      'no-alert': 0,
    },
    globals: {
      'TweenMax': true,
      '$': true,
      '_': true,
      'Happens': true,
      'THREE': true,
      'Sine': true,
      'Power2': true,
      'Expo': true,
    },
  },

	/**
	 * Webpack
	 */
	webpack: {
		output: {
			path: process.env.PWD + '/public',
			filename: 'app.js',
		},
		module: {
			loaders: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}]
		},
		resolve: {
			extensions: ['', '.js'],
			alias: {
				app: process.env.PWD + '/client/scripts',
				views: process.env.PWD + '/client/scripts/views',
			}
		},
	},

};
