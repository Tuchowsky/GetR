'use strict';
module.exports = function(grunt){
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'build/scripts/main.js': 'src/scripts/main.js'
                }
            }
        },
        sass: {
			dist: {
				files: {'build/styles/main.css': 'src/styles/main.sass'}
			}
		}, 
        watch: {
			options: {
				livereload: true,
			},
            all: {
                files: ['src/{,**/}*.*'],
                tasks: ['build']
            },
            babel:{
                files: ["src/**/*.js"],
                tasks: ["babel"]
            }
        },   
        mustache_render: {
            options: {},
            dist: {
                options: {
                    data: '',
                    directory: 'src/templates',
                    escape: false
                },
                files: [
                    {'build/index.html': 'src/templates/index.mustache'}
                ]
            }
        },
        copy: {
            scripts: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts',
                        src: '**',
                        dest: 'build/scripts/'  
                    }
                ]
            },
            styles: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/styles/styles/',
                        src: '**',
                        dest: 'build/styles/'  
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/gfx/',
                        src: '**',
                        dest: 'build/gfx/'
                    }
                ]
            },
            svg: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/svg',
                        src: '**',
                        dest: 'build/svg/' 
                    }
                ]
            }
        }
    });
    grunt.registerTask('build', [
        'sass',
        'mustache_render',
        'copy',
        'babel'
    ]);
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    
    grunt.registerTask('default', ['babel']);
};