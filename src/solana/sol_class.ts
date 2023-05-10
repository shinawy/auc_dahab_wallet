
import * as solanaWeb3 from '@solana/web3.js';
import {
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    Connection,
    clusterApiUrl,
    PublicKey,
  } from "@solana/web3.js";

export class Sol{

    constructor(){
        
    }

     create_wallet (master_seed: Uint8Array)  {
        let keypair = solanaWeb3.Keypair.fromSeed(master_seed);
        let privateKey = Buffer.from(keypair.secretKey).toString('hex');
        let publicKey = keypair.publicKey.toString();
        return [privateKey, publicKey];
        
    }
    async get_balance(publicKey: string) {
        let balance = 0;

        try {
            const connection = new Connection('https://api.testnet.solana.com');
            const accountInfo = await connection.getAccountInfo(new PublicKey(publicKey));
            const lamports = accountInfo?.lamports;
            balance = lamports ? lamports / 1000000000 : 0;
        } catch (error) {
            console.log('Error: ', error)
        }

        return balance;
    }
    
    async  send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string) {

        const connection = new Connection('https://api.testnet.solana.com');
        const toPublicKey = new PublicKey(receiver_pub_key);

        let fromKeypair = Keypair.fromSecretKey(
            Uint8Array.from(sender_priv_key.split(",").map(Number))
        );

        let transaction = new Transaction();
        transaction.add(
            SystemProgram.transfer({
            fromPubkey: fromKeypair.publicKey,
            toPubkey: toPublicKey,
            lamports: LAMPORTS_PER_SOL * parseFloat(amount)
            })
        );
        //TODO: should add await here 
        sendAndConfirmTransaction(connection, transaction, [fromKeypair]);

      }




}
