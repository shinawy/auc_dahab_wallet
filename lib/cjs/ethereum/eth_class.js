"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eth = void 0;
const ethers_1 = require("ethers");
// const  ethers= require("ethers")  
class Eth {
    constructor() {
    }
    create_wallet(master_mnemonic) {
        const wallet = ethers_1.ethers.Wallet.fromMnemonic(master_mnemonic);
        const privateKey = wallet._signingKey().privateKey;
        const publicKey = wallet.address;
        return [privateKey, publicKey];
    }
    get_balance(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = ethers_1.ethers.providers.getDefaultProvider("goerli");
            const balance = yield provider.getBalance(publicKey);
            return ethers_1.ethers.utils.formatEther(balance);
        });
    }
    send_transaction(sender_priv_key, receiver_pub_key, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let provider = ethers_1.ethers.providers.getDefaultProvider("goerli");
            let walletPrivKey = new ethers_1.ethers.Wallet(sender_priv_key);
            let tx = {
                to: receiver_pub_key,
                value: ethers_1.ethers.utils.parseEther(amount)
            };
            const wallet = walletPrivKey.connect(provider);
            yield walletPrivKey.signTransaction(tx);
            let result = yield wallet.sendTransaction(tx);
            return result;
        });
    }
}
exports.Eth = Eth;
// module.exports={Eth}
