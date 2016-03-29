import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('default', cb => {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
    run('clean', 'babel', 'restart', cb);
});

gulp.task('babel', cb => {
    run('babelServer', 'babelPublic', cb);
});
