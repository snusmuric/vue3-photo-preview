"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
function useBodyEffect(visible, rootElement) {
    var root = rootElement && typeof rootElement === "string"
        ? document.querySelector(rootElement)
        : rootElement;
    var style = (root ? root : document.body).style;
    var originalOverflow = style.overflow;
    (0, vue_1.watch)(visible, function () {
        if (visible.value) {
            style.overflow = "hidden";
        }
        else {
            style.overflow = originalOverflow;
        }
    });
}
exports.default = useBodyEffect;
//# sourceMappingURL=useBodyEffect.js.map