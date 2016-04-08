'use strict';

System.register([], function (_export, _context) {
    var App;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('App', App = function () {
                function App() {
                    _classCallCheck(this, App);
                }

                App.prototype.configureRouter = function configureRouter(config, router) {
                    config.title = 'Cerberus';
                    config.map([{ route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home' }]);

                    this.router = router;
                };

                return App;
            }());

            _export('App', App);
        }
    };
});