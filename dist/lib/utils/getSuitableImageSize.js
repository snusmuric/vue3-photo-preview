"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSuitableImageSize(naturalWidth, naturalHeight, rotate) {
    var _a;
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    // 如果图片不是水平，则调换宽高
    var isVertical = rotate % 180 !== 0;
    if (isVertical) {
        _a = [innerHeight, innerWidth], innerWidth = _a[0], innerHeight = _a[1];
    }
    var width;
    var height;
    // 缩放到和窗口一样所需要的比例
    var scaleWidth = innerWidth / naturalWidth;
    var scaleHeight = innerHeight / naturalHeight;
    if (naturalWidth < innerWidth && naturalHeight < innerHeight) {
        // 如果图片原始宽度未超过容器尺寸，则使用原始尺寸
        width = naturalWidth;
        height = naturalHeight;
    }
    else {
        // 否则缩放图片使之恰好放入
        if (scaleWidth < scaleHeight) {
            width = innerWidth;
            height = innerWidth * (naturalHeight / naturalWidth);
        }
        else {
            width = innerHeight * (naturalWidth / naturalHeight);
            height = innerHeight;
        }
    }
    return {
        width: width,
        height: height
    };
}
exports.default = getSuitableImageSize;
//# sourceMappingURL=getSuitableImageSize.js.map