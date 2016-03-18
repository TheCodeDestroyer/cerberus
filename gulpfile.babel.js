import gulp from 'gulp';
import shell from 'gulp-shell';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import rimraf from 'rimraf';
import run from 'run-sequence';

const rootPaths = {
    srcServer: './src/server',
    srcPublic: './src/public',
    dest: './app'
};

const paths = {
    srcServerJs: `${rootPaths.srcServer}/**/*.js`
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
    `babel ${rootPaths.srcServer} --out-dir ${rootPaths.dest} --sourceRoot=${rootPaths.srcServer}`
]));

gulp.task('server', () => {
    express = server.new(rootPaths.dest);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
    return watch([
        paths.srcServerJs
    ], () => {
        gulp.start('build');
    });
});