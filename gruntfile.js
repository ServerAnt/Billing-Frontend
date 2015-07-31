/*jshint camelcase: false */

var basePort = 8001,
    testPort = 8002;

module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    'assets/css/style.css': 'assets/sass/style.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 10 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'assets/css/*.css',
                dest: 'app/static/css/'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'app/static/css/style.min.css': [
                        'app/static/css/normalize.css',
                        'app/static/css/font-awesome.min.css',
                        'app/static/css/style.css',
                        'app/static/css/angular-flash.css',
                        'app/static/css/angucomplete-alt.css',
                        'app/static/css/angular-chart.css',
                        'app/static/css/xeditable.css',
                        'app/static/css/angular-block-ui.css'
                    ]
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'app/static/images/'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    // front-end
                    {
                        expand: true,
                        cwd: 'bower_components/normalize.css',
                        src: ['normalize.css'],
                        dest: 'app/static/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome/fonts',
                        src: ['*'],
                        dest: 'app/static/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome/css',
                        src: ['font-awesome.min.css'],
                        dest: 'app/static/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/html5shiv/dist',
                        src: ['html5shiv.min.js'],
                        dest: 'app/static/js/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/respond/dest',
                        src: ['respond.min.js'],
                        dest: 'app/static/js/',
                        filter: 'isFile'
                    },
                    // angular
                    {
                        expand: true,
                        cwd: 'bower_components/angular',
                        src: ['angular.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-loader',
                        src: ['angular-loader.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-ui-router/release',
                        src: ['angular-ui-router.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-cookies',
                        src: ['angular-cookies.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-resource',
                        src: ['angular-resource.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-scroll',
                        src: ['angular-scroll.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/satellizer',
                        src: ['satellizer.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-gravatar/build',
                        src: ['angular-gravatar.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angucomplete-alt',
                      src: ['angucomplete-alt.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angucomplete-alt',
                      src: ['angucomplete-alt.css'],
                      dest: 'app/static/css/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/momentjs',
                      src: ['moment.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-moment',
                      src: ['angular-moment.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-flash-alert/src',
                      src: ['angular-flash.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-flash-alert/src',
                      src: ['angular-flash.css'],
                      dest: 'app/static/css/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-animate',
                      src: ['angular-animate.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-translate',
                      src: ['angular-translate.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-translate-storage-cookie',
                      src: ['angular-translate-storage-cookie.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-translate-storage-local',
                      src: ['angular-translate-storage-local.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-translate-loader-static-files',
                      src: ['angular-translate-loader-static-files.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-cron-jobs/dist',
                      src: ['angular-cron-jobs.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-cron-jobs/dist',
                      src: ['angular-cron-jobs.css'],
                      dest: 'app/static/css/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/ng-file-upload/',
                      src: ['ng-file-upload.js'],
                      dest: 'app/static/js/angular',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/tc-angular-chartjs/dist',
                      src: ['tc-angular-chartjs.js'],
                      dest: 'app/static/js/angular/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/Chart.js',
                      src: ['Chart.js'],
                      dest: 'app/static/js/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-chart.js/dist',
                      src: ['angular-chart.css'],
                      dest: 'app/static/css/',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angulartics/src',
                      src: ['angulartics.js'],
                      dest: 'app/static/js/angular',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angulartics/src',
                      src: ['angulartics-ga.js'],
                      dest: 'app/static/js/angular',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-xeditable/dist/js/',
                      src: ['xeditable.js'],
                      dest: 'app/static/js/angular',
                      filter: 'isFile'
                    },
                    {
                      expand: true,
                      cwd: 'bower_components/angular-xeditable/dist/css/',
                      src: ['xeditable.css'],
                      dest: 'app/static/css/',
                      filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-block-ui/dist/',
                        src: ['angular-block-ui.js'],
                        dest: 'app/static/js/angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/angular-block-ui/dist/',
                        src: ['angular-block-ui.css'],
                        dest: 'app/static/css/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        protractor_webdriver: {
            options: {
                path: 'node_modules/protractor/bin/',
                command: 'webdriver-manager start --standalone'
            },
            test: {},
            daemonize: {
                options: {
                    keepAlive: true
                }
            }
        },

        protractor: {
            options: {
                configFile: 'test/protractor.conf.js', // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
            },
            test: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:' + testPort
                    }
                }
            },
            fasttest: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:' + basePort
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['assets/sass/*.scss', 'assets/sass/*/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    spawn: false,
                    livereload: false,
                }
            },
            css: {
              files: ['app/static/css/*.css', '!app/static/css/style.min.css'],
              tasks: ['cssmin'],
            },
            autoprefixer: {
                files: 'assets/css/**',
                tasks: ['autoprefixer']
            },
            images: {
                files: ['assets/images/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
            },
            scripts: {
                files: 'app/scripts/**/*.js',
                tasks: ['concat', 'uglify'],
                options: {
                    debounceDelay: 1000
                }
            },
            index: {
              files: 'app/index-template.html',
              tasks: ['preprocess:index']
            }
        },

        focus: {
            dev: {
                include: ['sass', 'autoprefixer', 'images', 'index']
            },
            prod: {
                include: ['sass', 'css', 'autoprefixer', 'images', 'scripts']
            }
        },

        connect: {
            options: {
                port: basePort,
                hostname: 'localhost',
                base: 'app'
            },
            server: {},
            test: {
                options: {
                    port: testPort,
                }
            }
        },

        nggettext_extract: {
            pot: {
                files: {
                  'i18n/template.pot': ['app/views/**/*.html']
                }
            },
        },

        po2json_angular_translate: {
            app: {
                options: {
                    pretty: true
                },
                files: {
                  'app/static/js/i18n/': ['i18n/*.po'],
                }
            }
        },

        concat: {
            build: {
                src: [
                    'app/static/js/angular/angular.js',
                    'app/static/js/angular/angular-animate.js',
                    'app/static/js/angular/angular-cookies.js',
                    'app/static/js/angular/angular-cron-jobs.js',
                    'app/static/js/angular/angular-flash.js',
                    'app/static/js/angular/angular-loader.js',
                    'app/static/js/angular/angular-gravatar.js',
                    'app/static/js/angular/moment.js',
                    'app/static/js/angular/angulartics.js',
                    'app/static/js/angular/angulartics-ga.js',
                    'app/static/js/angular/angular-moment.js',
                    'app/static/js/angular/angular-resource.js',
                    'app/static/js/angular/angular-scroll.js',
                    'app/static/js/angular/angular-ui-router.js',
                    'app/static/js/angular/angucomplete-alt.js',
                    'app/static/js/angular/satellizer.js',
                    'app/static/js/angular/angular-translate.js',
                    'app/static/js/angular/angular-translate-storage-cookie.js',
                    'app/static/js/angular/angular-translate-storage-local.js',
                    'app/static/js/angular/angular-translate-loader-static-files.js',
                    'app/static/js/angular/ng-file-upload.js',
                    'app/static/js/Chart.js',
                    'app/static/js/angular/tc-angular-chartjs.js',
                    'app/static/js/angular/xeditable.js',
                    'app/scripts/*.js',
                    'app/scripts/configs/*.js',
                    'app/scripts/controllers/*.js',
                    'app/scripts/configs/*.js',
                    'app/scripts/directives/*.js',
                    'app/scripts/services/*.js',
                    'app/static/js/angular/angular-block-ui.js'
                ],
                dest: 'app/static/js/main/main.js'
            }
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
            main: {
                files: {
                    'app/static/js/main/main.min.js': ['app/static/js/main/main.js']
                }
            }
        },
        env: {
            dev: {
                NODE_ENV: 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV: 'PRODUCTION'
            }
        },
        preprocess: {
            index: {
                src: 'app/index-template.html',
                dest: 'app/index.html'
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'build', ['copy', 'imagemin', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask(
        'run', ['copy', 'env:dev', 'preprocess:index', 'connect:server', 'imagemin', 'sass', 'autoprefixer', 'focus:dev']);
    grunt.registerTask('serve', ['connect',]);
    grunt.registerTask('default', ['run']);
    grunt.registerTask('test',
        ['connect:test', 'imagemin', 'sass', 'autoprefixer', 'protractor_webdriver:test', 'protractor:test']);

    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-po2json-angular-translate');

    grunt.registerTask(
      'prod', ['copy', 'env:prod', 'preprocess:index', 'imagemin', 'sass', 'autoprefixer', 'concat',
        'uglify', 'cssmin', 'focus:prod']);

    grunt.registerTask(
      'prodbatch', ['copy', 'env:prod', 'preprocess:index', 'imagemin', 'sass', 'autoprefixer', 'concat',
        'uglify', 'cssmin']);

};
