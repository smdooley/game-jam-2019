// https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development

var gulp = require('gulp');
var bs = require('browser-sync').create(); // create a browser sync instance.

gulp.task('serve', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('*.html').on('change', bs.reload);
    gulp.watch('js/**/*.js').on('change', bs.reload);
});