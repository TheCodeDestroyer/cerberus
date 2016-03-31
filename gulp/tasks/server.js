import gulp from 'gulp';
import server from 'gulp-live-server';
import paths from '../paths';

let express;

gulp.task('server', cb => {
    setTimeout(() => {
        express = server.new(paths.dest + '/index.js');
        express.start.bind(express)();
        cb();
    }, 100);
});

gulp.task('restart', () => {
    if (express) {
        express.start.bind(express)();
    }
});
