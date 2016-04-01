import gulp from 'gulp';
import server from 'gulp-live-server';
import paths from '../paths';

let express;

gulp.task('startServer', () => {
    express = server.new(paths.dest + '/index.js');
});

gulp.task('restartServer', cb => {
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
