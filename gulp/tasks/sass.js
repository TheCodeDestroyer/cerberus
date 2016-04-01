import gulp from 'gulp';
import sass from 'gulp-sass';
import paths from '../paths';

gulp.task('sass', () => {
    gulp.src(paths.srcSass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.destSass));
});
