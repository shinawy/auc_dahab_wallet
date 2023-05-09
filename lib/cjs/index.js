"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloNpm = exports.Eth = void 0;
//index.js
var eth_class_1 = require("./ethereum/eth_class");
Object.defineProperty(exports, "Eth", { enumerable: true, get: function () { return eth_class_1.Eth; } });
function helloNpm() {
    return "hello NPM";
}
exports.helloNpm = helloNpm;
;
// module.exports = helloNpm
