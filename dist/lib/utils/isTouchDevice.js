"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 当前设备是否支持触摸事件
 */
var isTouchDevice = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement;
exports.default = isTouchDevice;
//# sourceMappingURL=isTouchDevice.js.map