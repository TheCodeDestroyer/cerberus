import gulp from 'gulp';
import rimraf from 'rimraf';
import paths from '../paths';

gulp.task('clean', cb => {
    rimraf(paths.destPublic, function() {
        rimraf(`${paths.dest}/index.js`, cb);
    });
});
