import gulp from 'gulp';
import watch from 'gulp-watch';
import paths from '../paths';

gulp.task('watch', () => {
    return watch([
        paths.srcServerJs,
        paths.srcAppJs,
        paths.srcAppHtml,
        paths.srcSass
    ], () => {
        console.log('server');
        gulp.start('build');
    });
});
