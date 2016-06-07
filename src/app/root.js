import 'bootstrap';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';
import AppRouterConfig from './common/config/routerConfig';

@inject(Router, FetchConfig, AppRouterConfig)
export class Root {

    constructor(router, fetchConfig, appRouterConfig) {
        this.router = router;
        this.fetchConfig = fetchConfig;
        this.appRouterConfig = appRouterConfig;
    };

    activate() {
        this.fetchConfig.configure();
        this.appRouterConfig.configure();
    };
}