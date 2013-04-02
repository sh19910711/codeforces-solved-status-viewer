(function() {
    "use strict";

    module.exports = function( grunt ) {
        grunt.initConfig({
            sass: {
                dist: {
                    files: {
                        'css/application/main.css': ['scss/application/main.scss']
                    }
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-sass');

        grunt.registerTask('default', ['sass']);
    };
    
}).call();
