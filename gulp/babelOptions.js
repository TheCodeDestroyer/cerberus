let babelOptions = {};

babelOptions.base = function() {
    return {
        filename: '',
        filenameRelative: '',
        sourceMap: true,
        sourceRoot: '',
        moduleRoot: '',
        moduleIds: false,
        comments: false,
        compact: false,
        code: true,
        plugins: [
            'syntax-flow',
            'transform-decorators-legacy',
            'transform-flow-strip-types'
        ]
    };
};


babelOptions.system = function() {
    var options = babelOptions.base();
    options.presets = ['es2015-loose', 'stage-1'];
    options.plugins = [
        'transform-es2015-modules-systemjs',
        'syntax-flow',
        'transform-decorators-legacy',
        'transform-flow-strip-types'
    ];
    return options;
};

babelOptions.es2015 = function() {
    var options = babelOptions.base();
    options.presets = ['stage-1'];
    options.plugins = [
        'syntax-flow',
        'transform-decorators-legacy',
        'transform-flow-strip-types'
    ];
    return options;
};

babelOptions.server = function() {
    var options = babelOptions.base();
    options.presets = [ "es2015-node5", "stage-0" ];
    return options;
};

export default babelOptions;
