
import { ethers } from "ethers"
import {Eth} from "../ethereum/eth_class"
import {Sol} from "../solana/sol_class"
import {Cspr} from "../casper/cspr_class"
import {Polygon} from "../polygon/polygon_class"
import {create_mnemonics} from "../create_mnemonic"
import {create_seed} from "../create_seed"
import {store_keypair} from "../store_keypair"
import { claimKeys } from "../claim_keys"
import {ChainsInfo, IDictionary} from "../json_typing"

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



export class MasterWallet{

    constructor(){
        
    }

    create_master_mnemonic(){

        return create_mnemonics();
    }

    async create_master_seed(mnemonic: string){
        return await create_seed(mnemonic);
    }

    
    async create_master_wallet (master_mnemonic: string, password: string, return_encrypted_keys: boolean)  {
        let master_seed= await create_seed(master_mnemonic);
        let [eth_priv, eth_pub]=  eth_cls.create_wallet(master_mnemonic)
        let [sol_priv, sol_pub]=  sol_cls.create_wallet(master_seed)
        let [cspr_priv, cspr_pub]=  await cspr_cls.create_wallet(master_seed)
        let [polygon_priv, polygon_pub]=  polygon_cls.create_wallet(master_mnemonic)

        let info_enc: ChainsInfo<string>;
        if (!return_encrypted_keys){
           info_enc = {

                [`${abbreviations_map["ethereum"]}`]: {

                    [`${abbreviations_map["ethereum"]}_privateKey`]:eth_priv, 
                    [`${abbreviations_map["ethereum"]}_publicKey`]:eth_pub, 

                
                },

                [`${abbreviations_map["solana"]}`]: {

                    [`${abbreviations_map["solana"]}_privateKey`]:sol_priv, 
                    [`${abbreviations_map["solana"]}_publicKey`]:sol_pub, 

                
                },

                [`${abbreviations_map["casper"]}`]: {

                    [`${abbreviations_map["casper"]}_privateKey`]:cspr_priv, 
                    [`${abbreviations_map["casper"]}_publicKey`]:cspr_pub, 

                
                },

                [`${abbreviations_map["polygon"]}`]: {

                    [`${abbreviations_map["polygon"]}_privateKey`]:polygon_priv, 
                    [`${abbreviations_map["polygon"]}_publicKey`]:polygon_pub, 

                
                }

              }
        }

        else {

            let length= 192;
            let eth_encrypted: IDictionary<string>= await store_keypair(abbreviations_map["ethereum"],eth_pub,eth_priv,length,password) as IDictionary<string>
            let sol_encrypted: IDictionary<string>= await store_keypair(abbreviations_map["solana"],sol_pub,sol_priv,length,password) as IDictionary<string>
            let cspr_encrypted: IDictionary<string>= await store_keypair(abbreviations_map["casper"],cspr_pub,cspr_priv,length,password) as IDictionary<string>
            let polygon_encrypted: IDictionary<string>= await store_keypair(abbreviations_map["polygon"],polygon_pub,polygon_priv,length,password) as IDictionary<string>
            info_enc = {

                [`${abbreviations_map["ethereum"]}`]: eth_encrypted,
                [`${abbreviations_map["solana"]}`]: sol_encrypted,
                [`${abbreviations_map["casper"]}`]: cspr_encrypted,
                [`${abbreviations_map["polygon"]}`]: polygon_encrypted,

                
          
              }
        
        }

        return info_enc;
        
    }

    async get_master_balance(info_obj: ChainsInfo<string>) {

        let eth_pubkey= info_obj[abbreviations_map["ethereum"]][`${abbreviations_map["ethereum"]}_publicKey`]
        let sol_pubkey= info_obj[abbreviations_map["solana"]][`${abbreviations_map["solana"]}_publicKey`]
        let cspr_pubkey= info_obj[abbreviations_map["casper"]][`${abbreviations_map["casper"]}_publicKey`]
        let polygon_pubkey= info_obj[abbreviations_map["polygon"]][`${abbreviations_map["polygon"]}_publicKey`]
        let balance_info_obj = {

            [`${abbreviations_map["ethereum"]}`]: await eth_cls.get_balance(eth_pubkey),
            [`${abbreviations_map["solana"]}`]: await sol_cls.get_balance(sol_pubkey),
            [`${abbreviations_map["casper"]}`]: await cspr_cls.get_balance(cspr_pubkey),
            [`${abbreviations_map["polygon"]}`]: await polygon_cls.getPolygonMaticBalance(polygon_pubkey),

        }
          return balance_info_obj

    }
    
    async  claim_master_keys(info_obj: ChainsInfo<string>, password: string) {
        let length= 192
        let dec_eth= claimKeys(info_obj[abbreviations_map["ethereum"]],abbreviations_map["ethereum"], length,password)
        let dec_sol= claimKeys(info_obj[abbreviations_map["solana"]],abbreviations_map["solana"], length,password)
        let dec_cspr= claimKeys(info_obj[abbreviations_map["casper"]],abbreviations_map["casper"], length,password)
        let dec_polygon= claimKeys(info_obj[abbreviations_map["polygon"]],abbreviations_map["polygon"], length,password)
    
        let keys_info_obj: ChainsInfo<string> = {

            [`${abbreviations_map["ethereum"]}`]: dec_eth,
            [`${abbreviations_map["solana"]}`]: dec_sol,
            [`${abbreviations_map["casper"]}`]: dec_cspr,
            [`${abbreviations_map["polygon"]}`]: dec_polygon,

        }


        return keys_info_obj
      }

      




}

