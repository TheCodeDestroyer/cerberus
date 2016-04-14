import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', cb => {
    runSequence(
        'startServer',
        'buildWithServer',
        'watch',
        cb
    );
});

gulp.task('buildWithServer', cb => {
    runSequence(
        'build', 
        'restartServer', 
        cb
    );
});

gulp.task('build', cb => {
    runSequence(
        'clean', 
        'buildServer', 
        'buildPublic', 
        cb
    );
});

gulp.task('watch', cb => {
    runSequence(
        'watch', 
        cb
    );
});

gulp.task('buildServer', cb => {
    runSequence(
        'babelServer',
        cb
    );
});

gulp.task('buildPublic', cb => {
    runSequence(
        'babelPublic',
        'sass', 
        'copy',
        cb
    );
});

gulp.task('copy', cb => {
    runSequence(
        'copyViews',
        'copyJspm',
        cb
    );
});

gulp.task('copyViews', cb => {
    runSequence(
        'copyAppViews',
        'copyIndexView',
        cb
    );
});

gulp.task('publishDist', cb => {
    runSequence(
        'bumpVersion',
        'build',
        'copyNpmRequirements',
        'copyPackageJson',
        'updateMaster',
        'npmPublish',
        cb
    );
});

gulp.task('test', cb => {
    runSequence(
        'lint',
        cb
    );
});

gulp.task('lint', cb => {
    runSequence(
        'eslint',
        cb
    );
});
