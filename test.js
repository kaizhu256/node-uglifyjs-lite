/* istanbul instrument in package uglifyjs */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('utility2')).requireReadme();
        // init test
        local.testRunInit(local);
    }());



    // run shared js-env code - function
    (function () {
        local.testCase_uglify_default = function (options, onError) {
        /*
         * this function will test uglify's default handling-behavior
         */
            options = {};
            // test css handling-behavior
            options.data = local.uglify('body { margin: 0; }', 'aa.css');
            // validate data
            local.assertJsonEqual(options.data, 'body{margin:0;}');
            // test js handling-behavior
            options.data = local.uglify('aa = 1', 'aa.js');
            // validate data
            local.assertJsonEqual(options.data, 'aa=1');
            onError();
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        break;



    // run node js-env code - function
    case 'node':
        break;
    }
}());
