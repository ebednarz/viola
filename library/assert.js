'use strict';

function assert(summary) {
    return {
        select: function (selector) {
            return {
                attribute: function (name, value) {
                    var attributeValue = casper.getElementAttribute(selector, name);

                    if (value) {
                        casper.test.assertEquals(attributeValue, value, summary);
                    } else {
                        casper.test.assertType(attributeValue, 'string', summary);
                    }
                },
                class: function (className) {
                    var classList = casper.getElementAttribute(selector, 'class');
                    var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)');
                    casper.test.assertTruthy(regexp.test(classList), summary);
                },
                count: function (length) {
                    casper.test.assertElementCount(selector, length, summary);
                },
                style: function (property, value) {
                    casper.test.assertEvalEquals(function (selector, property) {
                        var element = __utils__.findOne(selector);
                        var style = window.getComputedStyle(element);
                        return style[property];
                    }, value, summary, [selector, property]);
                },
                text: function (value) {
                    casper.test.assertEval(function (selector, value) {
                        var element = __utils__.findOne(selector);
                        var textContent = element.textContent;

                        if ('string' == typeof value) {
                            return (textContent === value);
                        } else {
                            return value.test(textContent);
                        }
                    }, summary, [selector, value]);
                }
            };
        },
        exists: function (value) {
            casper.test.assertExists(value, summary);
        },
        text: function (value) {
            casper.test.assertTextExists(value, summary);
        },
        title: function (value) {
            var method = ('string' == typeof value) ?
                'assertTitle' :
                'assertTitleMatch';
            casper.test[method](value, summary);
        },
        url: function (expression) {
            casper.test.assertUrlMatch(expression, summary);
        }
    };
}

module.exports = assert;
