module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		vars: {
			version: '<%= grunt.template.today("yyyy.mm.dd-HH.MM") %>'
		},
		dirs: {
			src: 'src',
			css: 'assets/css',
			js: 'assets/js',
			build: 'build'
		},
		copy: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= dirs.src %>/',
					src: ['**'],
					dest: '<%= dirs.build %>/'
				}]
			}
		},
		concat: {
			options: {
				seperator: ';',
			},
			build: {
				src: [
					'<%= dirs.build %>/<%= dirs.js %>/libs/jquery.js',
					'<%= dirs.build %>/<%= dirs.js %>/libs/underscore.js',
					'<%= dirs.build %>/<%= dirs.js %>/libs/backbone.js',
					'<%= dirs.build %>/<%= dirs.js %>/libs/emmet.js',
					'<%= dirs.build %>/<%= dirs.js %>/libs/beautify.js',
					'<%= dirs.build %>/<%= dirs.js %>/libs/beautify-html.js',
					'<%= dirs.build %>/<%= dirs.js %>/libs/beautify-css.js',
					'<%= dirs.build %>/<%= dirs.js %>/app/utils.js',
					'<%= dirs.build %>/<%= dirs.js %>/app/routers/router.js',
					'<%= dirs.build %>/<%= dirs.js %>/app/views/header.js',
					'<%= dirs.build %>/<%= dirs.js %>/app/views/codemagic.js',
					'<%= dirs.build %>/<%= dirs.js %>/app/views/new.js',
					'<%= dirs.build %>/<%= dirs.js %>/app/main.js'
				],
				dest: '<%= dirs.build %>/<%= dirs.js %>/script.js'
			}
		},
		sass: {
			options: {
					unixNewlines: true
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					'<%= dirs.build %>/<%= dirs.css %>/style.css': '<%= dirs.build %>/<%= dirs.css %>/style.scss'
				}]
			},
			dist: {
				options: {
					style: 'compressed',
					banner: "By Adonis K.\n%TODO%"
				},
				files: [{
					'<%= dirs.build %>/<%= dirs.css %>/style.css': '<%= dirs.build %>/<%= dirs.css %>/style.scss'
				}]
			}
		},
		clean: {
			build: ['<%= dirs.build %>/'],
			buildCleanup: [
				'<%= dirs.build %>/<%= dirs.css %>/lib',
				'<%= dirs.build %>/<%= dirs.css %>/*.scss',
				'<%= dirs.build %>/<%= dirs.js %>/app',
				'<%= dirs.build %>/<%= dirs.js %>/libs'
			]
		},
		uglify: {
			options: {},
			build: {
				files: {
					'<%= dirs.build %>/<%= dirs.js %>/script.js': ['<%= dirs.build %>/<%= dirs.js %>/script.js']
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			files: {
				files: ['<%= dirs.src %>/**/**.*'],
				tasks : ['dev']
			}
		},
		htmlmin: {
			build: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true
				},
				files: {
					'<%= dirs.build %>/index.html': '<%= dirs.build %>/index.html',
					'<%= dirs.build %>/404.html': '<%= dirs.build %>/404.html'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 80,
					base: './build',
					hostname: '*',
					keepalive: true,
					livereload: true,
					open: 'http://localhost'
				}
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-devtools');

	// default task
	grunt.registerTask('dev',['clean:build', 'copy:build', 'concat:build', 'sass:dev', 'htmlmin:build', 'clean:buildCleanup']);
	grunt.registerTask('dist', ['clean:build', 'copy:build', 'concat:build', 'sass:dist', 'uglify:build', 'htmlmin:build', 'clean:buildCleanup']);
	grunt.registerTask('default', ['watch:files']);
};
