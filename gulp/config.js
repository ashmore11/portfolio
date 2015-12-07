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
	 * Paths for all the source files
	 */
	paths: {
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
	 * Config for nodemon
	 */
	nodemon: {
		script: 'keystone.js',
		ignore: ['gulp', 'client', 'node_modules', 'public']
	},

	/**
	 * Config for the webpack module bundler
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
