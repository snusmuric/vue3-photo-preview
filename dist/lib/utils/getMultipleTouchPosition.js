"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 从 Touch 事件中获取两个触控中心的位置
 * @param e TouchEvent
 */
function getMultipleTouchPosition(e) {
    var _a = e.touches[0], clientX = _a.clientX, clientY = _a.clientY;
    if (e.touches.length >= 2) {
        var _b = e.touches[1], nextClientX = _b.clientX, nextClientY = _b.clientY;
        return {
            clientX: (clientX + nextClientX) / 2,
            clientY: (clientY + nextClientY) / 2,
            touchLength: Math.sqrt(Math.pow(nextClientX - clientX, 2) + Math.pow(nextClientY - clientY, 2)),
        };
    }
    return { clientX: clientX, clientY: clientY, touchLength: 0 };
}
exports.default = getMultipleTouchPosition;
//# sourceMappingURL=getMultipleTouchPosition.js.map