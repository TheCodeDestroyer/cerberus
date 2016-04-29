import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'whatwg-fetch';

@inject(HttpClient)
export class ScriptDetail {
    heading = 'Script Detail';
    scriptId = '';

    constructor(http) {
        http.configure(config => {
            config
            .useStandardConfiguration()
            .withBaseUrl('/executeShell');
        });

        this.http = http;
    }
    
    activate(params) {
        this.scriptId = params.id; 
    }

}
