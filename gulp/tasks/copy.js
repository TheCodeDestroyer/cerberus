import gulp from 'gulp';
import jEditor from 'gulp-json-editor';
import paths from '../paths';

gulp.task('copyJspm', () => {
    gulp.src([
        './jspmConfig.js',
        './jspm_packages/**/*'
    ], { base: './' })
    .pipe(gulp.dest(paths.destApp));
    // .pipe(gulp.dest(paths.destPublic));
});

gulp.task('copyIndexView', () => {
    gulp.src(`${paths.srcApp}/index.html`)
    .pipe(gulp.dest(paths.destPublic));
});

gulp.task('copyAppViews', () => {
    gulp.src([
        paths.srcAppHtml,
        `!${paths.srcApp}/index.html`
    ])
    .pipe(gulp.dest(paths.destApp));
});

gulp.task('copyNpmRequirements', () => {
    gulp.src([
        'LICENSE',
        'README.md',
        './gulp/data/**/*'
    ])
    .pipe(gulp.dest(paths.dest));
});

gulp.task('copyPackageJson', () => {
    gulp.src('./package.json')
    .pipe(jEditor((json) => {
        delete json.devDependencies;
        delete json.scripts.postinstall;
        delete json.scripts.test;
        delete json.jspm;
        json.start = './bin/cerberus';
        json.bin.cerberus = './bin/cerberus';

        return json;
    }))
    .pipe(gulp.dest(paths.dest));
});
