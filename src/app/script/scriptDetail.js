import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'whatwg-fetch';

@inject(HttpClient)
export class ScriptDetail {
    heading = 'Script Detail';
    scriptName = '';

    constructor(http) {
        http.configure(config => {
            config
            .useStandardConfiguration()
            .withBaseUrl('/script');
        });

        this.http = http;
    }
    
    activate(params) {
        this.scriptName = params.name; 
    }

}
