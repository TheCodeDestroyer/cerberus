import corePaths from './corePaths';

const paths = {
    srcServer: `${corePaths.src}/${corePaths.app}/`,
    srcPublic: `${corePaths.src}/${corePaths.public}/`,
    destServer: `${corePaths.dest}/${corePaths.app}/`,
    destPublic: `${corePaths.dest}/${corePaths.public}/`,
    srcServerJs: `${corePaths.src}/${corePaths.app}/**/*.js`
};

export default paths;