"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var throttle_1 = require("lodash-es/throttle");
function useWindowResize(naturalWidth, naturalHeight, rotate, setSuitableImageSize) {
    var handleResize = (0, throttle_1.default)(function () {
        setSuitableImageSize(naturalWidth.value, naturalHeight.value, rotate.value);
    }, 8);
    window.addEventListener('resize', handleResize);
    (0, vue_1.onBeforeUnmount)(function () {
        window.removeEventListener('resize', handleResize);
    });
}
exports.default = useWindowResize;
//# sourceMappingURL=useWindowResize.js.map