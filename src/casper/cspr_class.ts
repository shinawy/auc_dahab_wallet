
import { getAccountBalance } from "./utils";
import {
    CasperClient,
    CLPublicKey,
    DeployUtil,
    Keys
  } from 'casper-js-sdk';
  import { PAYMENT_AMOUNTS, CONNECTION } from "./CasperTransferParams";
  import { Buffer } from 'buffer'
export class Cspr{

    constructor(){
        
    }

    async create_wallet(master_seed: Uint8Array) {
        
        const client = new CasperClient(CONNECTION.NODE_ADDRESS);
        const edKeyPair =  client.newHdWallet(master_seed);
        
        const privateKey = Buffer.from(edKeyPair.privateKey()).toString('hex');
        const publicKey = Buffer.from(edKeyPair.publicKey()).toString('hex');
        
        

        return [privateKey, publicKey];
        
    }
     
    async get_balance(publicKey: string) {
        let balance
        try{
         balance = await getAccountBalance(publicKey);
        }
        catch(e){
            console.log ("function cspr.get_balance() returned with error: ", e)
            balance= 0.0
        }
        return balance;
    }
    
    async  send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string) {
        
        let senderPrivateKeyArray = new Uint8Array(Buffer.from(sender_priv_key.split(",").map(Number)))

        const MOTE_RATE = 1000000000;
        const TTL = 1800000;

        const privateKey = Keys.Ed25519.parsePrivateKey(senderPrivateKeyArray)
        const publicKey = Keys.Ed25519.privateToPublicKey(senderPrivateKeyArray)
        const signKeyPair = Keys.Ed25519.parseKeyPair(publicKey, privateKey);

        const toAccount = CLPublicKey.fromHex(receiver_pub_key);
        let amount_float = parseInt(amount) * MOTE_RATE;

        const PAYMENT_AMOUNT = PAYMENT_AMOUNTS.NATIVE_TRANSFER_PAYMENT_AMOUNT;
        const deployParams = new DeployUtil.DeployParams(
            signKeyPair.publicKey,
            'casper-test',
            TTL
        );

        const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
            amount_float,
            toAccount,
            null,
            1
        );

        const payment = DeployUtil.standardPayment(PAYMENT_AMOUNT);

        const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);
        const client = new CasperClient(CONNECTION.NODE_ADDRESS);


        let signedDeployJson = client.signDeploy(deploy, signKeyPair);
        const transferDeployHash = await signedDeployJson.send(
            CONNECTION.NODE_ADDRESS
        );


        return transferDeployHash;
    }




}

