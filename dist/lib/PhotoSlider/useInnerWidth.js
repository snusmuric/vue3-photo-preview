"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var throttle_1 = require("lodash-es/throttle");
function useInnerWidth() {
    var innerWidth = (0, vue_1.ref)(window.innerWidth);
    var handleResize = (0, throttle_1.default)(function () {
        innerWidth.value = window.innerWidth;
    }, 8);
    window.addEventListener('resize', handleResize);
    (0, vue_1.onBeforeUnmount)(function () {
        window.removeEventListener('resize', handleResize);
    });
    return {
        innerWidth: innerWidth
    };
}
exports.default = useInnerWidth;
//# sourceMappingURL=useInnerWidth.js.map