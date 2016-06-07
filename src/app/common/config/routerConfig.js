import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export default class {

    constructor(router) {
        this.router = router;
    };

    configure() {
        let appRouterConfig = function(config) {
            config.title = 'Cerberus';
            config.addPipelineStep('authorize', AuthorizeStep);
            config.map([
                { route: ['', 'home'], name: 'home', moduleId: './home/list', nav: false, title: 'Home', auth: true },
                { route: 'script/:id', name: 'script', moduleId: './script/scriptDetail', nav: false, title: 'Script', auth: true },
                { route: 'login', name: 'login', moduleId: './auth/login', nav: false, title: 'Login', authRoute: true },
                { route: 'logout', name: 'logout', moduleId: './auth/logout', nav: false, title: 'Logout', authRoute: true }
            ]);
        };

        this.router.configure(appRouterConfig);
    };
}