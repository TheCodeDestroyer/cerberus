import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import 'whatwg-fetch';

@inject(HttpClient, Router)
export class Home {
    heading = 'Home';
    consoleOutputList = [];
    appRouter = {};

    constructor(http, router) {
        http.configure(config => {
            config
            .useStandardConfiguration()
            .withBaseUrl('/executeShell');
        });

        this.http = http;
        this.appRouter = router;
    }

    activate() {
        let socket = io();

        socket.on('shellLog', (consoleOutput) => {
            this.consoleOutputList.push(consoleOutput);
        });
    }

    callServer(uri) {
        this.consoleOutputList = [];

        return this.http.fetch(uri)
        .then(response => response.json())
        .then(responseObject => {
            console.log(responseObject);
        });
    }

    editScript(scriptId) {
        this.appRouter.navigateToRoute('script', { id: scriptId })
    }

}
