(function() {
    "use strict";

    module.exports = function( grunt ) {
        grunt.initConfig({
            
            sass: {
                application: {
                    files: {
                        'css/application/main.css': ['scss/application/main.scss']
                    }
                }
            },

            watch: {
                application: {
                    files: ['scss/application/*.scss'],
                    tasks: ['sass'],
                    options: {
                        nospawn: true
                    }
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('default', ['watch']);
    };
    
}).call();
