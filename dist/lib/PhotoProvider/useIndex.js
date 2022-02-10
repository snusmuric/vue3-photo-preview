"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
function useIndex(onIndexChange) {
    var index = (0, vue_1.ref)(0);
    var updateIndex = function (newIndex) {
        index.value = newIndex;
        onIndexChange();
    };
    return {
        index: index,
        updateIndex: updateIndex,
    };
}
exports.default = useIndex;
//# sourceMappingURL=useIndex.js.map