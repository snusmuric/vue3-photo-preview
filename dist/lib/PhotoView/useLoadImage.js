"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var getSuitableImageSize_1 = require("../utils/getSuitableImageSize");
function useLoadImage(src) {
    var naturalWidth = (0, vue_1.ref)(0);
    var naturalHeight = (0, vue_1.ref)(0);
    var width = (0, vue_1.ref)(0);
    var height = (0, vue_1.ref)(0);
    var loaded = (0, vue_1.ref)(false);
    function setSuitableImageSize(actualWidth, actualHeight, rotate) {
        var imageSize = (0, getSuitableImageSize_1.default)(actualWidth, actualHeight, rotate);
        width.value = imageSize.width;
        height.value = imageSize.height;
    }
    var loadImage = function (src) {
        loaded.value = false;
        var img = new Image();
        img.onload = function () {
            naturalWidth.value = img.naturalWidth;
            naturalHeight.value = img.naturalHeight;
            setSuitableImageSize(naturalWidth.value, naturalHeight.value, 0);
            loaded.value = true;
        };
        img.src = src;
    };
    loadImage(src.value);
    (0, vue_1.watch)(src, function () {
        loadImage(src.value);
    });
    return {
        width: width,
        height: height,
        loaded: loaded,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        setSuitableImageSize: setSuitableImageSize
    };
}
exports.default = useLoadImage;
//# sourceMappingURL=useLoadImage.js.map