const corePaths = {
    src: './src',
    dest: './dist',
    server: 'server',
    public: 'public',
    app: 'app',
    sass: 'sass',
    css: 'css'
};

//TODO: Clean this clusterfuck up!!!
const paths = {
    dest: corePaths.dest,
    srcServer: `${corePaths.src}/${corePaths.server}/`,
    srcApp: `${corePaths.src}/${corePaths.app}/`,
    destServer: `${corePaths.dest}/${corePaths.server}/`,
    destPublic: `${corePaths.dest}/${corePaths.public}/`,
    destApp: `${corePaths.dest}/${corePaths.public}/${corePaths.app}`,
    srcServerJs: `${corePaths.src}/${corePaths.server}/**/*.js`,
    srcAppJs: `${corePaths.src}/${corePaths.app}/**/*.js`,
    srcAppHtml: `${corePaths.src}/${corePaths.app}/**/*.html`,
    srcSass: `${corePaths.src}/${corePaths.sass}/**/*.scss`,
    srcSassMain: `${corePaths.src}/${corePaths.sass}/main.scss`,
    destSass: `${corePaths.dest}/${corePaths.public}/${corePaths.css}`,
    masterClone: '.masterClone'
};

export default paths;
