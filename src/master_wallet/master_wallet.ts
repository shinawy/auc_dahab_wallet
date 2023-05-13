
import { ethers } from "ethers"
import {Eth} from "../ethereum/eth_class"
import {Sol} from "../solana/sol_class"
import {Cspr} from "../casper/cspr_class"
import {Polygon} from "../polygon/polygon_class"
import {create_mnemonics} from "../create_mnemonic"
import {create_seed} from "../create_seed"
import {store_keypair} from "../store_keypair"

const abbreviations_map = {
    "casper": "CSPR",
    "ethereum": "ETH",
    "solana": "SOL",
    "polygon": "MATIC"
}

let eth_cls= new Eth();
let sol_cls= new Sol();
let cspr_cls= new Cspr();
let polygon_cls= new Polygon();


export class master_wallet{

    constructor(){
        
    }

     async create_master_wallet (password: string, return_encrypted_keys: boolean)  {
        let master_mnemonic= create_mnemonics()
        let master_seed= await create_seed(master_mnemonic);
        let [eth_priv, eth_pub]=  eth_cls.create_wallet(master_mnemonic)
        let [sol_priv, sol_pub]=  sol_cls.create_wallet(master_seed)
        let [cspr_priv, cspr_pub]=  await cspr_cls.create_wallet(master_seed)
        let [polygon_priv, polygon_pub]=  polygon_cls.create_wallet(master_mnemonic)

        let info_obj;
        if (!return_encrypted_keys){
           info_obj = {

                [`${abbreviations_map["ethereum"]}_privKey`]: eth_priv,
                [`${abbreviations_map["ethereum"]}_pubKey`]: eth_pub,

                [`${abbreviations_map["solana"]}_privKey`]: sol_priv,
                [`${abbreviations_map["solana"]}_pubKey`]: sol_pub,

                [`${abbreviations_map["casper"]}_privKey`]: cspr_priv,
                [`${abbreviations_map["casper"]}_pubKey`]: cspr_pub,

                [`${abbreviations_map["polygon"]}_privKey`]: polygon_priv,
                [`${abbreviations_map["polygon"]}_pubKey`]: polygon_pub,
                
          
              }
        }

        else {
            let length= 192;
            let eth_encrypted= await store_keypair(abbreviations_map["ethereum"],eth_pub,eth_priv,length,password)
            let sol_encrypted= await store_keypair(abbreviations_map["solana"],sol_pub,sol_priv,length,password)
            let cspr_encrypted= await store_keypair(abbreviations_map["casper"],cspr_pub,cspr_priv,length,password)
            let polygon_encrypted= await store_keypair(abbreviations_map["polygon"],polygon_pub,polygon_priv,length,password)
            info_obj = {

                [`${abbreviations_map["ethereum"]}`]: eth_encrypted,
                [`${abbreviations_map["solana"]}`]: sol_encrypted,
                [`${abbreviations_map["casper"]}`]: cspr_encrypted,
                [`${abbreviations_map["polygon"]}`]: polygon_encrypted,

                
          
              }
        
        }

        return info_obj;
        
    }
    async get_balance(publicKey: string) {
        const provider = ethers.providers.getDefaultProvider("goerli")
        const balance = await provider.getBalance(publicKey);
    
        return parseFloat(ethers.utils.formatEther(balance));
    }
    
    async  send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string) {
        let provider = ethers.providers.getDefaultProvider("goerli")
        let walletPrivKey = new ethers.Wallet(sender_priv_key)
      
        let tx = {
          to: receiver_pub_key,
          value: ethers.utils.parseEther(amount)
        }
      
        const wallet = walletPrivKey.connect(provider)
        await walletPrivKey.signTransaction(tx)
        let result = await wallet.sendTransaction(tx)
        return result
      }




}

