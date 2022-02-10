"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var isTouchDevice_1 = require("../utils/isTouchDevice");
var throttle_1 = require("lodash-es/throttle");
var types_1 = require("../types");
var constant_1 = require("../constant");
var withContinuousTap_1 = require("../utils/withContinuousTap");
var getPositionOnMoveOrScale_1 = require("../utils/getPositionOnMoveOrScale");
var getEdgeInfo_1 = require("../utils/getEdgeInfo");
var getMultipleTouchPosition_1 = require("../utils/getMultipleTouchPosition");
function useMoveImage(width, height, naturalWidth, naturalHeight, setSuitableImageSize, onTouchStart, onTouchMove, onTouchEnd, onSingleTap) {
    // 图片 x 偏移量
    var x = (0, vue_1.ref)(0);
    // 图片 y 偏移量
    var y = (0, vue_1.ref)(0);
    // 图片缩放程度
    var scale = (0, vue_1.ref)(1);
    // 图片旋转角度
    var rotate = (0, vue_1.ref)(0);
    // 图片是否处于触摸状态
    var touched = (0, vue_1.ref)(false);
    // 触摸开始时 x 的坐标
    var clientX = (0, vue_1.ref)(0);
    // 触摸开始时 y 的坐标
    var clientY = (0, vue_1.ref)(0);
    // 初始触摸状态
    var touchType = (0, vue_1.ref)(types_1.TouchTypeEnum.Normal);
    // 上一次图片的 x 偏移量
    var lastX = (0, vue_1.ref)(0);
    // 上一次图片的 y 偏移量
    var lastY = (0, vue_1.ref)(0);
    // 上一次 touch 的长度
    var lastTouchLength = (0, vue_1.ref)(0);
    // 边缘状态(用于缩放图片判断)
    var edgeTypes = [];
    var handleMouseDown = function (e) {
        if (isTouchDevice_1.default)
            return;
        handleDown(e.clientX, e.clientY, 0);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };
    var handleTouchStart = function (e) {
        if (!isTouchDevice_1.default)
            return;
        var touch = (0, getMultipleTouchPosition_1.default)(e);
        handleDown(touch.clientX, touch.clientY, touch.touchLength);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    };
    var handleDown = function (newClientX, newClientY, touchLength) {
        touched.value = true;
        clientX.value = newClientX;
        clientY.value = newClientY;
        lastTouchLength.value = touchLength;
        edgeTypes = (0, getEdgeInfo_1.getEdgeTypes)({
            width: width.value,
            height: height.value,
            scale: scale.value,
            rotate: rotate.value,
            x: lastX.value,
            y: lastY.value
        });
        onTouchStart(newClientX, newClientY);
    };
    var handleMouseMove = function (e) {
        if (isTouchDevice_1.default || !touched.value)
            return;
        handleMove(e.clientX, e.clientY, 0);
    };
    var handleTouchMove = function (e) {
        if (!isTouchDevice_1.default || !touched.value)
            return;
        var touch = (0, getMultipleTouchPosition_1.default)(e);
        handleMove(touch.clientX, touch.clientY, touch.touchLength);
    };
    var handleMove = (0, throttle_1.default)(function (newClientX, newClientY, touchLength) {
        // 初始化触摸状态
        if (touchType.value === types_1.TouchTypeEnum.Normal) {
            if (scale.value !== 1 || touchLength) {
                touchType.value = types_1.TouchTypeEnum.Scale;
            }
            else {
                var isMoveX = Math.abs(newClientX - clientX.value) > constant_1.minStartTouchOffset;
                var isMoveY = Math.abs(newClientY - clientY.value) > constant_1.minStartTouchOffset;
                if (!isMoveX && !isMoveY)
                    return;
                // 水平方向优先
                touchType.value = isMoveX ? types_1.TouchTypeEnum.X : types_1.TouchTypeEnum.Y;
            }
        }
        onTouchMove(touchType.value, newClientX, newClientY, edgeTypes);
        var newX = newClientX - clientX.value;
        var newY = newClientY - clientY.value;
        if (touchType.value === types_1.TouchTypeEnum.Y) {
            x.value = newX + lastX.value;
            y.value = newY + lastY.value;
        }
        if (touchType.value === types_1.TouchTypeEnum.Scale) {
            if (touchLength) {
                var endScale = scale.value + ((touchLength - lastTouchLength.value) / 100 / 2) * scale.value;
                var toScale = Math.max(Math.min(endScale, Math.max(constant_1.maxScale, naturalWidth.value / width.value)), 1);
                handleToScale(toScale, newClientX, newClientY);
                lastTouchLength.value = touchLength;
            }
            else {
                // 处于左边缘情况，右划交给父级处理，处于右边缘情况，左划交给父级处理
                if (!(newX > 0 && edgeTypes.includes(types_1.EdgeTypeEnum.Left)) &&
                    !(newX < 0 && edgeTypes.includes(types_1.EdgeTypeEnum.Right))) {
                    x.value = newX + lastX.value;
                }
                y.value = newY + lastY.value;
            }
        }
    }, 8, { trailing: false });
    var handleMouseUp = function (e) {
        if (isTouchDevice_1.default)
            return;
        handleUp(e.clientX, e.clientY);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
    var handleTouchEnd = function (e) {
        if (!isTouchDevice_1.default)
            return;
        var touch = e.changedTouches[0];
        handleUp(touch.clientX, touch.clientY);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
    };
    var onDoubleTap = function (newClientX, newClientY) {
        if (touchType.value !== types_1.TouchTypeEnum.Normal)
            return;
        if (scale.value === 1) {
            var toScale = Math.max(2, naturalWidth.value / width.value);
            var position = (0, getPositionOnMoveOrScale_1.default)({
                x: x.value,
                y: y.value,
                clientX: newClientX,
                clientY: newClientY,
                fromScale: scale.value,
                toScale: toScale,
            });
            x.value = position.x;
            y.value = position.y;
            scale.value = position.scale;
        }
        else {
            x.value = 0;
            y.value = 0;
            scale.value = 1;
        }
    };
    var onTap = (0, withContinuousTap_1.default)(onSingleTap, onDoubleTap);
    var handleUp = function (newClientX, newClientY) {
        if (clientX.value === newClientX && clientY.value === newClientY) {
            onTap(newClientX, newClientY);
        }
        onTouchEnd(touchType.value, newClientX, newClientY, edgeTypes);
        if (touchType.value === types_1.TouchTypeEnum.Y) {
            x.value = 0;
            y.value = 0;
        }
        if (touchType.value === types_1.TouchTypeEnum.Scale) {
            setStandardPosition({
                width: width.value,
                height: height.value,
                scale: scale.value,
                rotate: rotate.value,
                x: x.value,
                y: y.value
            });
        }
        touched.value = false;
        touchType.value = types_1.TouchTypeEnum.Normal;
        clientX.value = 0;
        clientY.value = 0;
        lastX.value = x.value;
        lastY.value = y.value;
    };
    var handleWheel = function (e) {
        var endScale = scale.value - e.deltaY / 100 / 2;
        var toScale = Math.max(Math.min(endScale, Math.max(constant_1.maxScale, naturalWidth.value / width.value)), 1);
        handleToScale(toScale, e.clientX, e.clientY);
    };
    var handleToScale = function (newScale, newClientX, newClientY) {
        var position = (0, getPositionOnMoveOrScale_1.default)({
            x: x.value,
            y: y.value,
            clientX: newClientX,
            clientY: newClientY,
            fromScale: scale.value,
            toScale: newScale,
        });
        setStandardPosition({
            width: width.value,
            height: height.value,
            scale: position.scale,
            rotate: rotate.value,
            x: position.x,
            y: position.y
        });
    };
    var setStandardPosition = function (position) {
        var standardPosition = (0, getEdgeInfo_1.getStandardPosition)(position);
        x.value = standardPosition.x;
        y.value = standardPosition.y;
        lastX.value = standardPosition.x;
        lastY.value = standardPosition.y;
        scale.value = standardPosition.scale;
    };
    var handleRotateLeft = function () {
        rotate.value = rotate.value - 90;
        setSuitableImageSize(naturalWidth.value, naturalHeight.value, rotate.value);
        setStandardPosition({
            width: width.value,
            height: height.value,
            scale: scale.value,
            rotate: rotate.value,
            x: x.value,
            y: y.value
        });
    };
    var handleRotateRight = function () {
        rotate.value = rotate.value + 90;
        setSuitableImageSize(naturalWidth.value, naturalHeight.value, rotate.value);
        setStandardPosition({
            width: width.value,
            height: height.value,
            scale: scale.value,
            rotate: rotate.value,
            x: x.value,
            y: y.value
        });
    };
    return {
        x: x,
        y: y,
        scale: scale,
        touched: touched,
        handleMouseDown: handleMouseDown,
        handleTouchStart: handleTouchStart,
        handleWheel: handleWheel,
        rotate: rotate,
        handleRotateLeft: handleRotateLeft,
        handleRotateRight: handleRotateRight
    };
}
exports.default = useMoveImage;
//# sourceMappingURL=useMoveImage.js.map