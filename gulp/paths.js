const corePaths = {
    src: './src',
    dest: './dist',
    app: 'app',
    public: 'public'
};

const paths = {
    dest: corePaths.dest,
    srcServer: `${corePaths.src}/${corePaths.app}/`,
    srcPublic: `${corePaths.src}/${corePaths.public}/`,
    destServer: `${corePaths.dest}/${corePaths.app}/`,
    destPublic: `${corePaths.dest}/${corePaths.public}/`,
    srcServerJs: `${corePaths.src}/${corePaths.app}/**/*.js`,
    srcPublicJs: `${corePaths.src}/${corePaths.public}/**/*.js`
};

export default paths;
