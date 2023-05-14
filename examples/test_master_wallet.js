const auc_dahab_wallet= require("auc_dahab_wallet")

async function test_master_wallet(my_mnemonic, pass){

    try{

        console.log("Testing Master Wallet: ....")

        

        let master_wallet= new auc_dahab_wallet.MasterWallet()
        
        let keys= await master_wallet.create_master_wallet(my_mnemonic, pass,true);
        let keys_str= JSON.stringify(keys, null,4)
        console.log(keys_str)
        
        let dec_keys= await master_wallet.claim_master_keys(keys,pass);  
        let dec_keys_str= JSON.stringify(dec_keys, null,4)
        console.log(dec_keys_str)

        let balance_obj= await master_wallet.get_master_balance(dec_keys)
        let balance_str= JSON.stringify(balance_obj, null,4)
     
        console.log (`balance_obj: ${balance_str}`)


    
    }
    catch(e){

        console.log("MasterWallet returns with an error: ", e)
    }

}

module.exports= {test_master_wallet}
