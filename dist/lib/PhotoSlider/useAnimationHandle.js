"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var types_1 = require("../types");
function useAnimationHandle(visible, currentItem) {
    var photoVisible = (0, vue_1.ref)(visible.value);
    var showAnimateType = (0, vue_1.ref)(types_1.ShowAnimateEnum.None);
    var originRect = (0, vue_1.ref)(null);
    (0, vue_1.watch)(visible, function () {
        var originRef = currentItem.value.originRef;
        // 点击打开按钮和关闭时收集位置信息，用于过渡动画
        if (originRef && originRef.nodeType === 1 && originRef.children.length > 0) {
            var _a = originRef.getBoundingClientRect(), top_1 = _a.top, left = _a.left, width = _a.width, height = _a.height;
            originRect.value = {
                left: left,
                top: top_1,
                width: width,
                height: height
            };
        }
        else {
            originRect.value = null;
        }
        if (visible.value) {
            // 设置动画类型
            showAnimateType.value = types_1.ShowAnimateEnum.In;
            // 显示图片
            photoVisible.value = true;
        }
        else {
            // 设置动画类型
            showAnimateType.value = types_1.ShowAnimateEnum.Out;
        }
    });
    // 动画结束的回调
    var onShowAnimateEnd = function () {
        // 动画完成才关闭弹窗
        if (showAnimateType.value === types_1.ShowAnimateEnum.Out) {
            photoVisible.value = false;
        }
        showAnimateType.value = types_1.ShowAnimateEnum.None;
    };
    return {
        photoVisible: photoVisible,
        showAnimateType: showAnimateType,
        originRect: originRect,
        onShowAnimateEnd: onShowAnimateEnd
    };
}
exports.default = useAnimationHandle;
//# sourceMappingURL=useAnimationHandle.js.map