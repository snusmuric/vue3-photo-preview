"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStandardPosition = exports.getEdgeTypes = exports.getEdgeInfo = void 0;
var types_1 = require("../types");
/**
 * 获取图片拖拽到边缘需要的值
 */
function getEdgeInfo(_a) {
    var _b;
    var width = _a.width, height = _a.height, scale = _a.scale, rotate = _a.rotate;
    // 如果图片不是水平，则调换宽高
    var isVertical = rotate % 180 !== 0;
    if (isVertical) {
        _b = [height, width], width = _b[0], height = _b[1];
    }
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    var currentWidth = width * scale;
    var currentHeight = height * scale;
    var edgeLeft, edgeRight, edgeTop, edgeBottom;
    if (currentWidth > innerWidth) {
        edgeLeft = (currentWidth - innerWidth) / 2;
        edgeRight = -(currentWidth - innerWidth) / 2;
    }
    else {
        edgeLeft = 0;
        edgeRight = 0;
    }
    if (currentHeight > innerHeight) {
        edgeTop = (currentHeight - innerHeight) / 2;
        edgeBottom = -(currentHeight - innerHeight) / 2;
    }
    else {
        edgeTop = 0;
        edgeBottom = 0;
    }
    return {
        edgeLeft: edgeLeft,
        edgeRight: edgeRight,
        edgeTop: edgeTop,
        edgeBottom: edgeBottom,
    };
}
exports.getEdgeInfo = getEdgeInfo;
/**
 * 获取边缘类型
 */
function getEdgeTypes(_a) {
    var width = _a.width, height = _a.height, scale = _a.scale, rotate = _a.rotate, x = _a.x, y = _a.y;
    var position = getEdgeInfo({ width: width, height: height, scale: scale, rotate: rotate });
    var edgeTypes = [];
    if (x === position.edgeLeft) {
        edgeTypes.push(types_1.EdgeTypeEnum.Left);
    }
    if (x === position.edgeRight) {
        edgeTypes.push(types_1.EdgeTypeEnum.Right);
    }
    if (y === position.edgeTop) {
        edgeTypes.push(types_1.EdgeTypeEnum.Top);
    }
    if (y === position.edgeBottom) {
        edgeTypes.push(types_1.EdgeTypeEnum.Bottom);
    }
    return edgeTypes;
}
exports.getEdgeTypes = getEdgeTypes;
/**
 * 获取标准值
 */
function getStandardPosition(_a) {
    var width = _a.width, height = _a.height, scale = _a.scale, rotate = _a.rotate, x = _a.x, y = _a.y;
    var _b = getEdgeInfo({ width: width, height: height, scale: scale, rotate: rotate }), edgeLeft = _b.edgeLeft, edgeRight = _b.edgeRight, edgeTop = _b.edgeTop, edgeBottom = _b.edgeBottom;
    if (x > edgeLeft) {
        x = edgeLeft;
    }
    if (x < edgeRight) {
        x = edgeRight;
    }
    if (y > edgeTop) {
        y = edgeTop;
    }
    if (y < edgeBottom) {
        y = edgeBottom;
    }
    return { x: x, y: y, scale: scale };
}
exports.getStandardPosition = getStandardPosition;
//# sourceMappingURL=getEdgeInfo.js.map