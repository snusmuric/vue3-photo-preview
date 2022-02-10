"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
function useItems(index) {
    var items = (0, vue_1.ref)([]);
    var updateItem = function (item) {
        var index = items.value.findIndex(function (_a) {
            var key = _a.key;
            return item.key === key;
        });
        if (index > -1) {
            items.value.splice(index, 1, item);
        }
        else {
            items.value.push(item);
        }
    };
    var removeItem = function (key) {
        var nextItems = items.value.filter(function (item) { return item.key !== key; });
        var nextEndIndex = nextItems.length - 1;
        items.value = nextItems;
        index.value = Math.min(index.value, nextEndIndex);
    };
    return {
        items: items,
        updateItem: updateItem,
        removeItem: removeItem,
    };
}
exports.default = useItems;
//# sourceMappingURL=useItems.js.map