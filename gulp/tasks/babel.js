import gulp from 'gulp';
import shell from 'gulp-shell';
import paths from '../paths';

gulp.task('babel', shell.task([
    `babel ${paths.srcServer} --out-dir ${paths.destServer} --sourceRoot=${paths.srcServer}`
]));