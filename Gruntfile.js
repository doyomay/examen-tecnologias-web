var stylesheetsDir = 'src/stylsheets';
var jsDir = 'src/scripts'

module.exports = function(grunt) {
	//plugin a usar
	//Configuracion de los archivos
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			compile: {
				files :{
					'app/js/main.js': jsDir + '/main.coffee'
				}
			},
			src: {
				files: [{
					expand: true,
					cwd : jsDir,
					src : '**/*.coffee',
					dest : 'app/js/',
					ext : '.js'
				}]
			}
		},
		injector: {
		  options: {
		    // Task-specific options go here.
		  },
		  bower_dependencies: {
		    // Target-specific file lists and/or options go here.
		    files:{
		    	'app/includes/header.html':['bower.json'],
		    	'app/includes/footer.html':['bower.json']
		    }
		  },
		  local_dependencies: {
		  	'app/includes/header.html': '**/*.css',
		  	'app/includes/footer.html': '**/*.js'
		  }
		},
		stylus: {
			compile: {
				options: {
					paths: [stylesheetsDir],
					'include css': true
				},
				files: {
					'app/css/main.min.css': stylesheetsDir + '/main.styl',
				}
			}
		},
		uglify: {
		  options: {
		    compress: {
		      drop_console: true
		    }
		  },
		  app: {
		    files: {
		      'app/js/main.min.js': ['app/js/main.js']
		    }
		  }
		},
		watch: {
			stylsheets: {
				files: [stylesheetsDir + '/**/*.styl', stylesheetsDir + '/**/*.css'],
				tasks: ['stylus'],
				options: {
					interrupt: true,
					reload : true
				}
			},
			coffe: {
				files: [jsDir+'/**/*.coffee', jsDir+'/**/*.js'],
				tasks: ['coffee'],
				options: {
					reload: true
				}
			}
		},
		wiredep: {
			target: {
				src:'app/includes/**/*.html'
			},
			dependencies: true
		}
	})

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-injector');
	grunt.loadNpmTasks('grunt-wiredep');

	//tareas a realizar
	grunt.registerTask('compile',['stylus','coffee','wiredep','uglify','injector']);
	grunt.registerTask('default',['compile','watch']);

}