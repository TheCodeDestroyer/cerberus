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
                    this.consoleOutputList = [];
                    this.socket = undefined;

                    this.socket = io();

                    http.configure(function (config) {
                        config.useStandardConfiguration().withBaseUrl('/executeShell');
                    });

                    this.http = http;

                    this.registerShellListener();
                }

                Home.prototype.callServer = function callServer(uri) {
                    var _this = this;

                    this.consoleOutputList = [];

                    return this.http.fetch(uri).then(function (response) {
                        return response.json();
                    }).then(function (responseObject) {
                        _this.consoleOutputList.push(responseObject);
                    });
                };

                Home.prototype.registerShellListener = function registerShellListener() {
                    var _this2 = this;

                    this.socket.on('shellLog', function (consoleOutput) {
                        _this2.consoleOutputList.push(consoleOutput);
                    });
                };

                return Home;
            }()) || _class));

            _export('Home', Home);
        }
    };
});