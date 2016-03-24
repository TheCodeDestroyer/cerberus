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
    gulp.src(paths.srcServerJs)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(babel(assign({}, babelOptions.server())))
    .pipe(sourcemaps.write({ includeContent: false, sourceRoot: paths.srcServer }))
    .pipe(gulp.dest(paths.destServer));
});

gulp.task('babelPublic', () => {
    gulp.src(paths.srcPublicJs)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(babel(assign({}, babelOptions.system())))
    .pipe(sourcemaps.write({ includeContent: false, sourceRoot: paths.srcPublic }))
    .pipe(gulp.dest(paths.destPublic));
});
