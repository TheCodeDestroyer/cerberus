import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import objectAssign from 'object.assign';
import paths from '../paths';
import babelOptions from '../babelOptions';

const assign = Object.assign || objectAssign;

gulp.task('babelServer', () => {
    return gulp.src(paths.srcServerJs)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(babel(assign({}, babelOptions.server())))
    .pipe(sourcemaps.write({ includeContent: false, sourceRoot: '/src' }))
    .pipe(gulp.dest(paths.destServer));
});
