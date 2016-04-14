import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
// import io from 'socket.io-client';
import 'whatwg-fetch';

@inject(HttpClient)
export class Home {
    heading = 'Home';
    consoleOutputList = [];
    socket = undefined;

    constructor(http) {
        this.socket = io();
        
        http.configure(config => {
            config
            .useStandardConfiguration()
            .withBaseUrl('/executeShell');
        });

        this.http = http;

        this.registerShellListener();
    }

    callServer(uri) {
        this.consoleOutputList = [];
        
        return this.http.fetch(uri)
        .then(response => response.json())
        .then(responseObject => {
            console.log(responseObject);
        });
    }

    registerShellListener() {
        this.socket.on('shellLog', (consoleOutput) =>{
            this.consoleOutputList.push(consoleOutput);
        });
    }
}
