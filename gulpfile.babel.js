import gulp from 'gulp';
import shell from 'gulp-shell';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import rimraf from 'rimraf';
import run from 'run-sequence';

const rootPaths = {
    src: './src',
    dest: './app'
};

const paths = {
    srcJs: `${rootPaths.src}/**/*.js`
};

let express;

gulp.task('default', cb => {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
    run('clean', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
    rimraf(rootPaths.dest, cb);
});

gulp.task('babel', shell.task([
    `babel ${rootPaths.src} --out-dir ${rootPaths.dest}`
]));

gulp.task('server', () => {
    express = server.new(rootPaths.dest);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
    return watch([
        paths.srcJs
    ], () => {
        gulp.start('build');
    });
});