const corePaths = {
    src: './src',
    dest: './dist',
    server: 'server',
    public: 'public',
    sass: 'sass',
    css: 'css'
};

//TODO: Clean this clusterfuck up!!!
const paths = {
    dest: corePaths.dest,
    srcServer: `${corePaths.src}/${corePaths.server}/`,
    srcPublic: `${corePaths.src}/${corePaths.public}/`,
    destServer: `${corePaths.dest}/${corePaths.server}/`,
    destPublic: `${corePaths.dest}/${corePaths.public}/`,
    srcServerJs: `${corePaths.src}/${corePaths.server}/**/*.js`,
    srcPublicJs: `${corePaths.src}/${corePaths.public}/**/*.js`,
    srcPublicHtml: `${corePaths.src}/${corePaths.public}/**/*.html`,
    srcSass: `${corePaths.src}/${corePaths.sass}/main.scss`,
    destSass: `${corePaths.dest}/${corePaths.public}/${corePaths.css}`
};

export default paths;
