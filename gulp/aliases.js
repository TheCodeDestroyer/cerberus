import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('default', cb => {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
    run('clean', 'babel', 'copy', 'restart', cb);
});

gulp.task('babel', cb => {
    run('babelServer', 'babelPublic', cb);
});

gulp.task('copy', cb => {
    run('copyViews', 'copyJspm', cb);
});
