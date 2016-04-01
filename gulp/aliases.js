import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('dev', cb => {
    run('startServer', 'build', 'watch', cb);
});

gulp.task('build', cb => {
    run('clean', 'buildServer', 'buildPublic', 'restartServer', cb);
});

gulp.task('watch', cb => {
    run('watch', cb);
});

gulp.task('buildServer', cb => {
    run('babelServer', cb);
});

gulp.task('buildPublic', cb => {
    run('babelPublic', 'sass', 'copy', cb);
});

gulp.task('copy', cb => {
    run('copyViews', 'copyJspm', cb);
});
