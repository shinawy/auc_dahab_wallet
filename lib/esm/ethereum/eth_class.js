import { ethers } from "ethers";
// const  ethers= require("ethers")  
export class Eth {
    constructor() {
    }
    create_wallet(master_mnemonic) {
        const wallet = ethers.Wallet.fromMnemonic(master_mnemonic);
        const privateKey = wallet._signingKey().privateKey;
        const publicKey = wallet.address;
        return [privateKey, publicKey];
    }
    async get_balance(publicKey) {
        const provider = ethers.providers.getDefaultProvider("goerli");
        const balance = await provider.getBalance(publicKey);
        return ethers.utils.formatEther(balance);
    }
    async send_transaction(sender_priv_key, receiver_pub_key, amount) {
        let provider = ethers.providers.getDefaultProvider("goerli");
        let walletPrivKey = new ethers.Wallet(sender_priv_key);
        let tx = {
            to: receiver_pub_key,
            value: ethers.utils.parseEther(amount)
        };
        const wallet = walletPrivKey.connect(provider);
        await walletPrivKey.signTransaction(tx);
        let result = await wallet.sendTransaction(tx);
        return result;
    }
}
// module.exports={Eth}
