module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-rollup');
	grunt.loadNpmTasks('grunt-contrib-clean');
	var nodeResolve = require("rollup-plugin-node-resolve");
	var rollupSourcemaps = require('rollup-plugin-sourcemaps');

	//////////////////    Main File    /////////////////////////
	////////////////////////////////////////////////////////////
	mainfile = 'out/src/ts/matrixHeatmapAnimated.js';
	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		rollup: {
			options: {
				sourceMap: true,
				// sourceMapRelative: true,
				cache: 'js/bundle.js',
				format: 'umd',
				moduleName: 'dglos',
				plugins: function () {
					return [
						nodeResolve({
							jsnext: true,
							main: true
						}),
						rollupSourcemaps()
					]
				}
			},
			files: {
				dest: 'js/bundle.js',
				src: mainfile
			},
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: './'
				}
			}
		},
		ts: {
			default: {
				tsconfig: true
			},
			options: {
				fast: "always",
				target: 'es6'
			}
		},
		tslint: {
			options: {
				configuration: "tslint.json",
				force: true
			},
			files: {
				src: "src/ts/**/*.ts"
			}

		},
		watch: {
			typescript: {
				files: 'src/**/*.ts',
				tasks: ['compile']
			}
		},
		open: {
			dev: {
				path: 'http://localhost:8080/index.html'
			}
		},
		clean: {
			tscommands: "tscommand-*"

		}
	});

	grunt.registerTask('compile', ['tslint', 'ts', 'clean', 'rollup']);
	grunt.registerTask('default', ['connect', 'open', 'watch']);
	// grunt.registerTask('default', 'compile');
};