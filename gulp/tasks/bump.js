import gulp from 'gulp';
import bump from 'gulp-bump';
import args from '../args';

gulp.task('bumpVersion', () => {
    gulp.src(['./package.json'])
    .pipe(bump({ type: args.bump }))
    .pipe(gulp.dest('./'));
});