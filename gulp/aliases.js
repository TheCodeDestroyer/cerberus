import gulp from 'gulp';
import watch from 'gulp-watch';
import run from 'run-sequence';

gulp.task('default', cb => {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
    run('clean', 'babel', 'restart', cb);
});
