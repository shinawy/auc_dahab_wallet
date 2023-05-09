"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_mnemonics = void 0;
var bip39_1 = require("bip39");
function create_mnemonics() {
    return ((0, bip39_1.generateMnemonic)());
}
exports.create_mnemonics = create_mnemonics;
