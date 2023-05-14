
import { ethers } from "ethers"
import {Eth} from "../ethereum/eth_class"
import {Sol} from "../solana/sol_class"
import {Cspr} from "../casper/cspr_class"
import {Polygon} from "../polygon/polygon_class"
import {create_mnemonics} from "../create_mnemonic"
import {create_seed} from "../create_seed"
import {store_keypair} from "../store_keypair"
import { claimKeys } from "../claim_keys"

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

    create_master_mnemonic(){

        return create_mnemonics();
    }

    async create_master_seed(mnemonic: string){
        return await create_seed(mnemonic);
    }

    
    async create_master_wallet (password: string, return_encrypted_keys: boolean, master_mnemonic: string)  {
        let master_seed= await create_seed(master_mnemonic);
        let [eth_priv, eth_pub]=  eth_cls.create_wallet(master_mnemonic)
        let [sol_priv, sol_pub]=  sol_cls.create_wallet(master_seed)
        let [cspr_priv, cspr_pub]=  await cspr_cls.create_wallet(master_seed)
        let [polygon_priv, polygon_pub]=  polygon_cls.create_wallet(master_mnemonic)

        let info_obj:Object;
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

    async get_master_balance(info_obj: Object) {
        let balance_info_obj = {

            [`${abbreviations_map["ethereum"]}`]: eth_cls.get_balance(info_obj[abbreviations_map["ethereum"]]),
            [`${abbreviations_map["solana"]}`]: sol_cls.get_balance(info_obj[abbreviations_map["solana"]]),
            [`${abbreviations_map["casper"]}`]: cspr_cls.get_balance(info_obj[abbreviations_map["casper"]]),
            [`${abbreviations_map["polygon"]}`]: polygon_cls.getPolygonMaticBalance(info_obj[abbreviations_map["polygon"]]),

        }
          return balance_info_obj

    }
    
    async  claim_master_keys(info_obj: Object, password: string) {
        let length= 192
        let dec_eth= claimKeys(info_obj[abbreviations_map["ethereum"]],abbreviations_map["ethereum"], length,password)
        let dec_sol= claimKeys(info_obj[abbreviations_map["solana"]],abbreviations_map["solana"], length,password)
        let dec_cspr= claimKeys(info_obj[abbreviations_map["casper"]],abbreviations_map["casper"], length,password)
        let dec_polygon= claimKeys(info_obj[abbreviations_map["polygon"]],abbreviations_map["polygon"], length,password)
    
        let keys_info_obj = {

            [`${abbreviations_map["ethereum"]}`]: dec_eth,
            [`${abbreviations_map["solana"]}`]: dec_sol,
            [`${abbreviations_map["casper"]}`]: dec_cspr,
            [`${abbreviations_map["polygon"]}`]: dec_polygon,

        }


        return keys_info_obj
      }




}

