import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import 'whatwg-fetch';

@inject(HttpClient, Router)
export class Home {
    heading = 'Home';
    scriptList = [];
    consoleOutputList = [];
    appRouter = {};

    constructor(http, router) {
        http.configure(config => {
            config
            .useStandardConfiguration();
        });

        this.http = http;
        this.appRouter = router;
    }

    activate() {
        let socket = io();

        socket.on('shellLog', (consoleOutput) => {
            this.consoleOutputList.push(consoleOutput);
        });

        this.http.fetch(`script`)
        .then(response => response.json())
        .then(responseObject => {
            this.scriptList = responseObject.data;
            console.log(responseObject);
        });
    }

    executeShell(name) {
        this.consoleOutputList = [];

        this.http.fetch(`executeShell/${name}`)
        .then(response => response.json())
        .then(responseObject => {
            console.log(responseObject);
        });
    }

    editScript(scriptId) {
        this.appRouter.navigateToRoute('script', { id: scriptId })
    }

}
