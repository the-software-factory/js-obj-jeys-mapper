// Defines build process
module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/object-keys-mapper.min.js': 'src/object-keys-mapper.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);
};
