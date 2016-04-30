'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'whatwg-fetch'], function (_export, _context) {
    var inject, HttpClient, json, Router, _dec, _class, ScriptDetail;

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
            json = _aureliaFetchClient.json;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_whatwgFetch) {}],
        execute: function () {
            _export('ScriptDetail', ScriptDetail = (_dec = inject(HttpClient, Router, json), _dec(_class = function () {
                function ScriptDetail(http, router, json) {
                    _classCallCheck(this, ScriptDetail);

                    this.heading = 'Script Detail';
                    this.scriptModel = {};

                    http.configure(function (config) {
                        config.useStandardConfiguration().withBaseUrl('/script');
                    });

                    this.http = http;
                    this.router = router;
                    this.json = json;
                }

                ScriptDetail.prototype.activate = function activate(params) {
                    var _this = this;

                    var scriptId = params.id;

                    this.scriptModel.name = 'New';

                    if (scriptId.length > 2) {
                        this.http.fetch('/' + scriptId).then(function (response) {
                            return response.json();
                        }).then(function (responseObject) {
                            _this.scriptModel = responseObject.data;
                            console.log(responseObject);
                        });
                    }
                };

                ScriptDetail.prototype.submit = function submit() {
                    var _this2 = this;

                    var scriptModel = this.scriptModel;
                    var methodType = 'post';
                    var uri = '';
                    if (scriptModel._id) {
                        methodType = 'put';
                        uri = '/' + scriptModel._id;
                    }

                    this.http.fetch(uri, {
                        method: methodType,
                        body: json(scriptModel)
                    }).then(function () {
                        _this2.router.navigate('');
                    });
                };

                ScriptDetail.prototype.cancel = function cancel() {
                    this.router.navigate('');
                };

                ScriptDetail.prototype.saveScript = function saveScript() {};

                ScriptDetail.prototype.updateScript = function updateScript() {};

                return ScriptDetail;
            }()) || _class));

            _export('ScriptDetail', ScriptDetail);
        }
    };
});