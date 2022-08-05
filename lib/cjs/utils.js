"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobile = void 0;
var ismobilejs_1 = __importDefault(require("ismobilejs"));
function isMobile() {
    return (0, ismobilejs_1.default)(window === null || window === void 0 ? void 0 : window.navigator).any;
}
exports.isMobile = isMobile;
