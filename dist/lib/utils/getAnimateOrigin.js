"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAnimateOrigin(originRect) {
    if (originRect) {
        var innerWidth_1 = window.innerWidth, innerHeight_1 = window.innerHeight;
        // 动画的元素宽高为 0，计算触发的点的中心到中点的距离即是 AnimateOrigin（粗略计算）
        var xOrigin = originRect.left + originRect.width / 2 - innerWidth_1 / 2;
        var yOrigin = originRect.top + originRect.height / 2 - innerHeight_1 / 2;
        return "".concat(xOrigin, "px ").concat(yOrigin, "px");
    }
    return null;
}
exports.default = getAnimateOrigin;
//# sourceMappingURL=getAnimateOrigin.js.map