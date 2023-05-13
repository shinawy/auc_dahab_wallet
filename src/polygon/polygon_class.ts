
import { ethers } from "ethers"
import { POSClient, use } from "@maticnetwork/maticjs"
// import HDWalletProvider from "@truffle/hdwallet-provider"
// var HDWalletProvider = require("truffle-hdwallet-provider");
var HDWalletProvider = require("@truffle/hdwallet-provider");

import  { Web3ClientPlugin } from "@maticnetwork/maticjs-web3"
import {Eth} from "../ethereum/eth_class"
// const  ethers= require("ethers")  


let eth_cls= new Eth();

export class Polygon{

    constructor(){
        
    }

     create_wallet (master_mnemonic: string)  {
        return eth_cls.create_wallet(master_mnemonic);
        
    }
    async getPolygonMaticBalance(publicKey: string) {
        const dic_net = {
            name: 'Mumbai Testnet',
            chainId: 80001,
            _defaultProvider: (providers) => new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')
          };
          let provider =  ethers.providers.getDefaultProvider(dic_net)
        
          const balance = await provider.getBalance(publicKey);
          return parseFloat(ethers.utils.formatEther(balance));
    }

    async getPolygonWethBalance(publicKey: string, privateKey: string) {
        use(Web3ClientPlugin);
        const posClient = new POSClient();

        await posClient.init({
            network: "testnet",
            version: "mumbai",
            parent: {
                provider:  new HDWalletProvider({
                    privateKeys:[privateKey],
                    providerOrUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
            }),
                defaultConfig: {
                    from: publicKey
                }
            },
            child: {
                provider:  new HDWalletProvider({
                    privateKeys:[privateKey],
                    
                    providerOrUrl:'https://rpc-mumbai.maticvigil.com'
            }),
                defaultConfig: {
                    from: publicKey
                }
            }
        });

        const erc20Token = posClient.erc20("0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa");//weth's token on mumbai
        const wallet_balance = await erc20Token.getBalance(publicKey);

        return parseFloat( wallet_balance) / 1000000000000000000
    }
    
    async  send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string) {
        const dic_net = {
            name: 'Mumbai Testnet',
            chainId: 80001,
            _defaultProvider: (providers) => new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')
          };
        
          let provider =  ethers.providers.getDefaultProvider(dic_net)
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
