import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('eslint', () => {
    return gulp.src([
        '**/*.js',
        '!node_modules/**',
        '!jspm_packages/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
