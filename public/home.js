'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'whatwg-fetch'], function (_export, _context) {
    var inject, HttpClient, _dec, _class, Home;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }, function (_whatwgFetch) {}],
        execute: function () {
            _export('Home', Home = (_dec = inject(HttpClient), _dec(_class = function () {
                function Home(http) {
                    _classCallCheck(this, Home);

                    this.heading = 'Home';
                    this.result = '';

                    http.configure(function (config) {
                        config.useStandardConfiguration().withBaseUrl('/executeShell');
                    });

                    this.http = http;
                }

                Home.prototype.callServer = function callServer(uri) {
                    var _this = this;

                    return this.http.fetch(uri).then(function (response) {
                        return response.json();
                    }).then(function (responseObject) {
                        console.log(responseObject);
                        _this.result = responseObject.execResult;
                    });
                };

                return Home;
            }()) || _class));

            _export('Home', Home);
        }
    };
});