import authConfig from './common/constants/authConfig';

export function configure(aurelia) {
    aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-auth', (baseConfig) => {
        baseConfig.configure(authConfig);
    });

    aurelia.start().then(() => aurelia.setRoot('root'));
}
