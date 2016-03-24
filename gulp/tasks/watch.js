import gulp from 'gulp';
import watch from 'gulp-watch';
import paths from '../paths';

gulp.task('watch', () => {
    return watch([
        paths.srcServerJs
    ], () => {
        gulp.start('build');
    });
});
