import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('dev', cb => {
    run('startServer', 'buildWithServer', 'watch', cb);
});

gulp.task('buildWithServer', cb => {
    run('build', 'restartServer', cb);
});

gulp.task('build', cb => {
    run('clean', 'buildServer', 'buildPublic', cb);
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

gulp.task('publishDist', cb => {
    run('bumpVersion', 'build', 'copyNpmRequirements', 'copyPackageJson', 'updateMaster', 'npmPublish', cb);
});
