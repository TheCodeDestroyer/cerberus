'use strict';

System.register([], function (_export, _context) {
    var Root;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('Root', Root = function () {
                function Root() {
                    _classCallCheck(this, Root);
                }

                Root.prototype.configureRouter = function configureRouter(config, router) {
                    config.title = 'Cerberus';
                    config.map([{ route: ['', 'home'], name: 'home', moduleId: './home/list', nav: false, title: 'Home' }, { route: 'script/:id', name: 'script', moduleId: './script/scriptDetail', nav: false, title: 'Script' }]);

                    this.router = router;
                };

                return Root;
            }());

            _export('Root', Root);
        }
    };
});