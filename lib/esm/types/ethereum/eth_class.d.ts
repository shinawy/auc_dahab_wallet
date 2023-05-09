import { ethers } from "ethers";
export declare class Eth {
    constructor();
    create_wallet(master_mnemonic: string): string[];
    get_balance(publicKey: string): Promise<string>;
    send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string): Promise<ethers.providers.TransactionResponse>;
}
//# sourceMappingURL=eth_class.d.ts.map