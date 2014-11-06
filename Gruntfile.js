/**
 * Created by wei.wang on 14-11-3.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: {name:"|ric w|"},

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
               // beautify:true
            },
            my_target: {
                files: {
                    'release/js/webrobot.min.js': ['js/webrobot.js']
                }
            }
			//all_target: {
            //    files: {
            //        'release/js/all.min.js': ['js/**/*.js']
            //    }
           // }
        },
        watch: {
            scripts: {
                files: '**/*.js',
                tasks: ['default'],
                options: {
                    interrupt: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/**/*.js'],
                dest: 'release/js/all.js'
            }
        },
        autoprefixer: {
            autofixer_target: {
                src: 'css/webrobot.css',
                dest: 'release/css/webrobot.css'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'release/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'release/css/',
                ext: '.min.css'
            }
        }
    });
       //    grunt.initConfig({
//        uglify: {
//            my_target: {
//                files: [{
//                    expand: true,
//                    cwd: 'src/js',
//                    src: '**/*.js',
//                    dest: 'dest/js'
//                }]
//            }
//        }
//    });


    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 默认被执行的任务列表。
    grunt.registerTask("autoprefixerTest",["autoprefixer"]);
    grunt.registerTask('uglifyTest', ['uglify']);
    grunt.registerTask('concatTest', ['concat']);
    grunt.registerTask('watchTask', ['watch','uglify']);

    grunt.registerTask('all', ['uglify','autoprefixer','cssmin']);
};