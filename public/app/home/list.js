'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'whatwg-fetch'], function (_export, _context) {
    var inject, HttpClient, Router, _dec, _class, Home;

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
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_whatwgFetch) {}],
        execute: function () {
            _export('Home', Home = (_dec = inject(HttpClient, Router), _dec(_class = function () {
                function Home(http, router) {
                    _classCallCheck(this, Home);

                    this.heading = 'Home';
                    this.scriptList = [];
                    this.consoleOutputList = [];
                    this.appRouter = {};

                    http.configure(function (config) {
                        config.useStandardConfiguration();
                    });

                    this.http = http;
                    this.appRouter = router;
                }

                Home.prototype.activate = function activate() {
                    var _this = this;

                    var socket = io();

                    socket.on('shellLog', function (consoleOutput) {
                        _this.consoleOutputList.push(consoleOutput);
                    });

                    this.http.fetch('script').then(function (response) {
                        return response.json();
                    }).then(function (responseObject) {
                        _this.scriptList = responseObject.data;
                        console.log(responseObject);
                    });
                };

                Home.prototype.executeShell = function executeShell(name) {
                    this.consoleOutputList = [];

                    this.http.fetch('executeShell/' + name).then(function (response) {
                        return response.json();
                    }).then(function (responseObject) {
                        console.log(responseObject);
                    });
                };

                Home.prototype.editScript = function editScript(scriptId) {
                    this.appRouter.navigateToRoute('script', { id: scriptId });
                };

                return Home;
            }()) || _class));

            _export('Home', Home);
        }
    };
});