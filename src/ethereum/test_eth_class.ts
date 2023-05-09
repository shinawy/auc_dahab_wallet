import {Eth} from "./eth_class"
// const Eth= require('./eth_class')
import {create_mnemonics} from "../create_mnemonic"
import {create_seed} from "../create_seed"
import { mainModule } from "process"


async function main(){

    const my_mnemonic = create_mnemonics();
    const my_seed =  await create_seed(my_mnemonic)

    console.log(`mymnemonic: ${my_mnemonic}, myseed: ${my_seed}`)
    // seed= "6792efe97ee1725339cdebed23f10147f905854ba03698e3955694ae5daaf8346e72c6398546c3917cd1c1ff3563f579de6bcc892df3e9cb913a5d7b2eebfffc"

    let eth_cls= new Eth()
    let keys= eth_cls.create_wallet(my_mnemonic);
    let privateKey= keys[0].toString(), publicKey=keys[1].toString();
    console.log (`privateKey: ${privateKey}, publicKey: ${publicKey}`)

    let balance= await eth_cls.get_balance(publicKey)
    console.log (`balance: ${balance}`)

    let result= await eth_cls.send_transaction(privateKey, publicKey, "0.0005")
    console.log (`result: ${result}`)

}
(async () => {
    try {
        await main();
        console.log("Code Executed");
  
    } catch (e) {
       console.log (`main returns with this error: ${e}`)
    }
    
  })();


