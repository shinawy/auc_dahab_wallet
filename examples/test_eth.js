const auc_dahab_wallet= require("auc_dahab_wallet")

async function test_eth(my_mnemonic){

    try{

        console.log("Testing Ethereum: ....")
        let eth_cls= new auc_dahab_wallet.Eth()
        
        let keys= eth_cls.create_wallet(my_mnemonic);
        let privateKey= keys[0].toString(), publicKey=keys[1].toString();
        console.log (`privateKey: ${privateKey}, publicKey: ${publicKey}`)

        let balance= await eth_cls.get_balance(publicKey)
        console.log (`balance: ${balance}`)

        let result= await eth_cls.send_transaction(privateKey, publicKey, "0.0005")
        console.log (`result: ${result}`)
    
    }
    catch(e){

        console.log("Ethereum returns with an error: ", e)
    }

}
module.exports={test_eth}