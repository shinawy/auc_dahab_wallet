const auc_dahab_wallet= require("auc_dahab_wallet")

async function test_cspr(my_mnemonic){

    try{

        console.log("Testing Casper: ....")


        let cspr_cls= new auc_dahab_wallet.Cspr()
        let seed= await auc_dahab_wallet.create_seed(my_mnemonic)
        console.log (`seed: ${seed}`)
        let keys= await cspr_cls.create_wallet(seed);
        let privateKey= keys[0], publicKey=keys[1];
        console.log (`privateKey: ${privateKey}, publicKey: ${publicKey}`)

        // let balance= await cspr_cls.get_balance(publicKey)
        // console.log (`balance: ${balance}`)

        
        // await cspr_cls.send_transaction(privateKey, publicKey, "0.0005")
        
    
    }
    catch(e){

        console.log("Casper returns with an error: ", e)
    }

}

module.exports= {test_cspr}