/* istanbul instrument in package uglifyjs */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
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
        // init isBrowser
        local.isBrowser = typeof window === "object" &&
            typeof window.XMLHttpRequest === "function" &&
            window.document &&
            typeof window.document.querySelectorAll === "function";
        // init global
        local.global = local.isBrowser
            ? window
            : global;
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('utility2')).requireReadme();
        // init test
        local.testRunDefault(local);
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
}());
