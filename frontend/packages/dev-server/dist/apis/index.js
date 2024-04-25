"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginDevRouter = exports.pageDevRouter = exports.storeDevRouter = exports.apiDevRouter = exports.qiniuRouter = exports.rootRouter = void 0;
var rootRouter_1 = require("./rootRouter");
Object.defineProperty(exports, "rootRouter", { enumerable: true, get: function () { return __importDefault(rootRouter_1).default; } });
var qiniuRouter_1 = require("./qiniuRouter");
Object.defineProperty(exports, "qiniuRouter", { enumerable: true, get: function () { return __importDefault(qiniuRouter_1).default; } });
var apiDevRouter_1 = require("./apiDevRouter/apiDevRouter");
Object.defineProperty(exports, "apiDevRouter", { enumerable: true, get: function () { return __importDefault(apiDevRouter_1).default; } });
var storeDevRouter_1 = require("./storeDevRouter/storeDevRouter");
Object.defineProperty(exports, "storeDevRouter", { enumerable: true, get: function () { return __importDefault(storeDevRouter_1).default; } });
var pageDevRouter_1 = require("./pageDevRouter/pageDevRouter");
Object.defineProperty(exports, "pageDevRouter", { enumerable: true, get: function () { return __importDefault(pageDevRouter_1).default; } });
var pluginDevRouter_1 = require("./pluginDevRouter/pluginDevRouter");
Object.defineProperty(exports, "pluginDevRouter", { enumerable: true, get: function () { return __importDefault(pluginDevRouter_1).default; } });
//# sourceMappingURL=index.js.map