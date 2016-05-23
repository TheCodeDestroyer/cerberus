import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import 'whatwg-fetch';

@inject(HttpClient, Router, json)
export class ScriptDetail {
    heading = 'Script Detail';
    scriptModel = {};

    constructor(http, router, json) {
        http.configure(config => {
            config
            .useStandardConfiguration()
            .withBaseUrl('/api/script');
        });

        this.http = http;
        this.router = router;
        this.json = json;
    }

    activate(params) {
        const scriptId = params.id;

        this.scriptModel.name = 'New';

        if (scriptId.length > 2) {
            this.http.fetch(`/${scriptId}`)
            .then(response => response.json())
            .then(responseObject => {
                this.scriptModel = responseObject.data;
            });
        }
    }

    submit() {
        const scriptModel = this.scriptModel;
        let methodType = 'post';
        let uri = '';
        if (scriptModel._id) {
            methodType = 'put';
            uri = `/${scriptModel._id}`
        }

        this.http.fetch(uri, {
            method: methodType,
            body: json(scriptModel)
        })
        .then(() => {
            this.router.navigate('');
        });
    }

    cancel() {
        this.router.navigate('')
    }

    saveScript() {

    }

    updateScript() {

    }

}
