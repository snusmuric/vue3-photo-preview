"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = require("lodash-es/debounce");
function withContinuousTap(singleTap, doubleTap) {
    // 当前连续点击次数
    var continuousCount = 0;
    var withSingleTap = (0, debounce_1.default)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        continuousCount = 0;
        singleTap.apply(void 0, args);
    }, 300);
    return function invokeTap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        continuousCount += 1;
        withSingleTap.apply(void 0, args);
        if (continuousCount >= 2) {
            withSingleTap.cancel();
            continuousCount = 0;
            doubleTap.apply(void 0, args);
        }
    };
}
exports.default = withContinuousTap;
//# sourceMappingURL=withContinuousTap.js.map