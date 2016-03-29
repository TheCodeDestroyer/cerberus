import gulp from 'gulp';
import server from 'gulp-live-server';
import paths from '../paths';

let express;

gulp.task('server', () => {
    express = server.new(paths.dest);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});
