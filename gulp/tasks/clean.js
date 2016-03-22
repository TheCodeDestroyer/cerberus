import gulp from 'gulp';
import rimraf from 'rimraf';
import paths from '../paths';

gulp.task('clean', cb => {
    rimraf(paths.destServer, cb);
});
