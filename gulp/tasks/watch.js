import gulp from 'gulp';
import watch from 'gulp-watch';
import paths from '../paths';

gulp.task('watch', () => {
    return watch([
        paths.srcServerJs,
        paths.srcPublicJs,
        paths.srcPublicHtml,
        paths.srcSass
    ], () => {
        console.log('server');
        gulp.start('build');
    });
});
