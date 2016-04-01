import gulp from 'gulp';
import server from 'gulp-live-server';
import paths from '../paths';

let express;

gulp.task('server', () => {
    express = server.new(paths.dest + '/index.js');
});

gulp.task('restart', cb => {
    if (express) {
        setTimeout(() => {
            express.start.bind(express)();
            cb();
        }, 1000);
    }
    else {
        cb();
    }
});
