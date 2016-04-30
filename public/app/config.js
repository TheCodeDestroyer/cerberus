'use strict';

System.register([], function (_export, _context) {
    return {
        setters: [],
        execute: function () {
            function configure(aurelia) {
                aurelia.use.standardConfiguration().developmentLogging();

                aurelia.start().then(function () {
                    return aurelia.setRoot('root');
                });
            }

            _export('configure', configure);
        }
    };
});