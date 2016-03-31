const corePaths = {
    src: './src',
    dest: './dist',
    server: 'server',
    public: 'public'
};

const paths = {
    dest: corePaths.dest,
    srcServer: `${corePaths.src}/${corePaths.server}/`,
    srcPublic: `${corePaths.src}/${corePaths.public}/`,
    destServer: `${corePaths.dest}/${corePaths.server}/`,
    destPublic: `${corePaths.dest}/${corePaths.public}/`,
    srcServerJs: `${corePaths.src}/${corePaths.server}/**/*.js`,
    srcPublicJs: `${corePaths.src}/${corePaths.public}/**/*.js`,
    srcPublicHtml: `${corePaths.src}/${corePaths.public}/**/*.html`
};

export default paths;
