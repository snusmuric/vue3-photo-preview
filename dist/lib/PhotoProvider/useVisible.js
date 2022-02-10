"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
function useVisible(items, index, onVisibleChange) {
    var visible = (0, vue_1.ref)(false);
    var handleHide = function () {
        visible.value = false;
        onVisibleChange();
    };
    var handleShow = function (key) {
        var itemIndex = items.value.findIndex(function (item) { return item.key === key; });
        if (itemIndex > -1) {
            index.value = itemIndex;
            visible.value = true;
            onVisibleChange();
        }
    };
    return {
        visible: visible,
        handleHide: handleHide,
        handleShow: handleShow,
    };
}
exports.default = useVisible;
//# sourceMappingURL=useVisible.js.map