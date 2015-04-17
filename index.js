'use strict';
var assert = require('./library/assert');
var VIEWPORT_DEFAULT_HEIGHT = 640;

function parseViewport(value) {
    var parts = /^(\d+)(?:\s*x\s*(\d+))?$/.exec(value);
    var width = Number(parts[1]);
    var height = Number(parts[2] || VIEWPORT_DEFAULT_HEIGHT);
    return [width, height];
}

function done() {
    casper.test.done();
}

function violaFactory(origin) {
    return function (description, url, suite) {

        function runSection(viewport) {
            var size = parseViewport(viewport);
            var section = [description, size.join('x')].join(' @ ');
            var configuration = suite[viewport];
            var testCallback;

            function test() {
                casper.start(origin + url);
                casper.viewport(size[0], size[1]);
                testCallback(casper, assert);
                casper.run(done);
            }

            if ('function' == typeof configuration) {
                testCallback = configuration;
                configuration = {
                    test: test
                };
            } else {
                testCallback = configuration.test;
                configuration.test = test;
            }

            casper.test.begin(section, configuration);
        }

        Object.keys(suite).forEach(runSection, this);
    };
}

module.exports = violaFactory;
