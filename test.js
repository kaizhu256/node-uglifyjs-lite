/* istanbul instrument in package uglifyjs */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = local.global.utility2_rollup || local.global.local;
            local.global.utility2.objectSetDefault(local, local.global.utility2);
            break;
        // re-init local from example.js
        case 'node':
            local = (local.global.utility2_rollup || require('utility2'))
                .requireExampleJsFromReadme();
            break;
        }
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



    // run node js-env code - function
    case 'node':
        local.testCase_buildApiDoc_default = function (options, onError) {
        /*
         * this function will test buildApiDoc's handling-behavior
         */
            options = {};
            local.buildApiDoc(options, onError);
        };

        local.testCase_buildApp_default = function (options, onError) {
        /*
         * this function will test buildApp's handling-behavior
         */
            local.testCase_buildReadme_default(options, local.onErrorDefault);
            options = [];
            local.buildApp(options, onError);
        };

        local.testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's handling-behavior
         */
            options = {};
            local.buildReadme(options, onError);
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = { modeCoverageMerge: true, url: local.serverLocalHost + '?modeTest=1' };
            local.browserTest(options, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // run tests
        local.nop(local.modeTest && document.querySelector('#testRunButton1').click());
        break;



    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.testRunServer(local);
        break;
    }
}());
