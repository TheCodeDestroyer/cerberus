import fs from 'fs';
import del from 'del';
import shell from 'shelljs';
import gulp from 'gulp';
import git from 'gulp-git';
import paths from '../paths';

const version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;

let cloneRepo = () => new Promise((resolve, reject) => {
    git.clone('git@github.com:TheCodeDestroyer/cerberus.git', { args: `${paths.masterClone} -b master` }, function(err) {
        if (err) {
            console.error(err);
            reject();
        }
        else {
            resolve();
        }
    });
});

let copyDist = () => new Promise((resolve, reject) => {
    gulp.src(`${paths.dest}/**/*`)
    .pipe(gulp.dest(paths.masterClone))
    .on('error', reject)
    .on('end', resolve);
});

let addAndCommitFiles = () => new Promise((resolve, reject) => {
    gulp.src(`${paths.masterClone}/*`)
    .pipe(git.add({ args: '-A', cwd: paths.masterClone }))
    .pipe(git.commit('New version: v' + version, { cwd: paths.masterClone }))
    .on('error', reject)
    .on('end', resolve);
});

let pushToDeploy = () => new Promise((resolve, reject) => {
    git.push('origin', 'master', { cwd: paths.masterClone }, (err) => {
        if (err) {
            console.error(err);
            reject();
        }
        else {
            resolve();
        }
    });
});

gulp.task('updateMaster', (cb) => {
    del(paths.masterClone)
    .then(() => cloneRepo())
    .then(() => del(`${paths.masterClone}/**/*`))
    .then(() => copyDist())
    .then(() => addAndCommitFiles())
    .then(() => pushToDeploy())
    .then(() => {
        cb();
    });
});

gulp.task('npmPublish', (cb) => {
    var npmExec = shell.which('npm');
    
    shell.exec(`${npmExec} publish ${paths.masterClone}`, () => {
        console.log('done');
        cb();
    });
});
