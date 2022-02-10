"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoSlider = exports.PhotoConsumer = exports.PhotoProvider = void 0;
var tslib_1 = require("tslib");
var index_vue_1 = require("./PhotoProvider/index.vue");
exports.PhotoProvider = index_vue_1.default;
var index_vue_2 = require("./PhotoConsumer/index.vue");
exports.PhotoConsumer = index_vue_2.default;
var index_vue_3 = require("./PhotoSlider/index.vue");
exports.PhotoSlider = index_vue_3.default;
var components = [
    index_vue_1.default,
    index_vue_2.default,
    index_vue_3.default
];
var install = function (app) {
    components.forEach(function (component) {
        app.component(component.name, component);
    });
};
(0, tslib_1.__exportStar)(require("./types"), exports);
exports.default = { install: install };
//# sourceMappingURL=index.js.map