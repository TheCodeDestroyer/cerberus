import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'whatwg-fetch';

@inject(HttpClient)
export class Home {
    heading = 'Home';
    result = '';

    constructor(http) {
        http.configure(config => {
            config
            .useStandardConfiguration()
            .withBaseUrl('/executeShell');
        });

        this.http = http;
    }

    callServer(uri) {
        return this.http.fetch(uri)
        .then(response => response.json())
        .then(responseObject => {
            console.log(responseObject);
            this.result = responseObject.execResult; 
        });
    }
}
