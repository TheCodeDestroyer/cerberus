import gulp from 'gulp';
import paths from '../paths';

gulp.task('copyJspm', () => {
    gulp.src([
        './jspmConfig.js',
        './jspm_packages'
    ])
    .pipe(gulp.dest(paths.destPublic));
});

gulp.task('copyViews', () => {
    gulp.src(paths.srcPublicHtml)
    .pipe(gulp.dest(paths.destPublic));
});
