"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取移动或缩放之后的中心点
 */
function getPositionOnMoveOrScale(_a) {
    var x = _a.x, y = _a.y, clientX = _a.clientX, clientY = _a.clientY, fromScale = _a.fromScale, toScale = _a.toScale;
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    // 缩放前的图片的中心坐标
    var imageCenterClientX = innerWidth / 2 + x;
    var imageCenterClientY = innerHeight / 2 + y;
    // 放大偏移量
    var offsetScale = toScale / fromScale;
    // 缩放后的偏移量(为保证点击的点相对于视图位置不变，需要将缩放多出来的尺寸通过 translate 平衡掉)
    var originX = -(clientX - imageCenterClientX) * (offsetScale - 1);
    var originY = -(clientY - imageCenterClientY) * (offsetScale - 1);
    return {
        x: originX + x,
        y: originY + y,
        scale: toScale,
    };
}
exports.default = getPositionOnMoveOrScale;
//# sourceMappingURL=getPositionOnMoveOrScale.js.map