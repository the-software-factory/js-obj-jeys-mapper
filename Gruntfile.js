var exec = require('child_process').exec;

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/*.js', 'test/src/**/*.js']
        },
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
        },
        conventionalChangelog: {
            options: {
                changelogOpts: {
                    preset: "jshint"
                }
            },
            release: {
                src: "CHANGELOG.md"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-conventional-changelog');

    grunt.registerTask("changelogCommit", function() {
        var done = this.async();

        var gitAdder = exec('git add CHANGELOG.md');

        gitAdder.on("exit", function(exitCode) {
            if (exitCode !== 0) {
                grunt.fail.fatal("changelogCommit task couldn't exec git add command");
            }

            var gitCommitter = exec('git commit -m "CHANGELOG.md Updated"');

            gitCommitter.on("exit", function(exitCode) {
                if (exitCode !== 0) {
                    grunt.fail.fatal("changelogCommit task couldn't exec git commit command");
                }

                grunt.log.ok("Changelog commit is ready");
                done();
            });
        });
    });

    grunt.registerTask("changelog", ["conventionalChangelog", "changelogCommit"]);
    grunt.registerTask('default', ['jshint', 'uglify']);
};
