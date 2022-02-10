"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeTypeEnum = exports.TouchTypeEnum = exports.ShowAnimateEnum = void 0;
// 动画类型
var ShowAnimateEnum;
(function (ShowAnimateEnum) {
    ShowAnimateEnum[ShowAnimateEnum["None"] = 0] = "None";
    ShowAnimateEnum[ShowAnimateEnum["In"] = 1] = "In";
    ShowAnimateEnum[ShowAnimateEnum["Out"] = 2] = "Out";
})(ShowAnimateEnum = exports.ShowAnimateEnum || (exports.ShowAnimateEnum = {}));
// 触摸状态
var TouchTypeEnum;
(function (TouchTypeEnum) {
    TouchTypeEnum[TouchTypeEnum["Normal"] = 0] = "Normal";
    TouchTypeEnum[TouchTypeEnum["X"] = 1] = "X";
    TouchTypeEnum[TouchTypeEnum["Y"] = 2] = "Y";
    TouchTypeEnum[TouchTypeEnum["Scale"] = 3] = "Scale";
})(TouchTypeEnum = exports.TouchTypeEnum || (exports.TouchTypeEnum = {}));
// 边缘状态
var EdgeTypeEnum;
(function (EdgeTypeEnum) {
    EdgeTypeEnum[EdgeTypeEnum["Left"] = 0] = "Left";
    EdgeTypeEnum[EdgeTypeEnum["Right"] = 1] = "Right";
    EdgeTypeEnum[EdgeTypeEnum["Top"] = 2] = "Top";
    EdgeTypeEnum[EdgeTypeEnum["Bottom"] = 3] = "Bottom";
})(EdgeTypeEnum = exports.EdgeTypeEnum || (exports.EdgeTypeEnum = {}));
//# sourceMappingURL=types.js.map