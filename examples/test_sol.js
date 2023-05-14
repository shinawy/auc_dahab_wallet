const auc_dahab_wallet= require("auc_dahab_wallet")

async function test_sol(my_mnemonic){

    try{

        console.log("Testing Solana: ....")


        let sol_cls= new auc_dahab_wallet.Sol()
        let seed= await auc_dahab_wallet.create_seed(my_mnemonic)
        console.log (`seed: ${seed}`)
        let keys= sol_cls.create_wallet(seed);
        let privateKey= keys[0], publicKey=keys[1];
        // let privateKey = '9e1fd8e04304ab017d188bdebf434a9cd0248222c438f68ed83c445e4456fea34c81a87a5ed781aa00cf34165a829b3e123b202743ff5f596292b87a3e217b46';
        // let publicKey = '69ef1WyEHve8mbAFzZKZ2dENuEiVAzrbvqL2fFop3qmF';
        
    
        // console.log (`privateKey: ${privateKey}, publicKey: ${publicKey}`)

        let balance= await sol_cls.get_balance(publicKey)
        console.log (`balance: ${balance}`)

        
        await sol_cls.send_transaction(privateKey, publicKey, "0.0005")
        
    
    }
    catch(e){

        console.log("Solana returns with an error: ", e)
    }

}

module.exports= {test_sol}