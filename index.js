'use strict';

/* global angular:false */

// create main application module
var app = angular.module('Layout', ['ui.bootstrap']);

app.directive('anchor', function () {

    function link(scope, element, attrs) {
        var e = element[0];

        e.style.position = 'absolute';

        function layout() {
            var height = e.parentElement.clientHeight;
            var top = 0;

            if (attrs.anchorTop === 'parent') {
                top = 0;
            } else if (attrs.anchorTop) {
                top = window.document.getElementById(attrs.anchorTop).offsetHeight  + window.document.getElementById(attrs.anchorTop).offsetTop;
            }

            // calculate temporary height
            height -= top;

            if (attrs.anchorBottom === 'parent') {
                height -= 0;
            } else if (attrs.anchorBottom) {
                height -= window.document.getElementById(attrs.anchorBottom).offsetHeight;
            } else {
                height = null;
            }

            e.style.top = top + 'px';
            if (height !== null) e.style.height = height + 'px';
        }

        layout();
        window.addEventListener('resize', layout);
    }

    return {
        link: link
    };
});