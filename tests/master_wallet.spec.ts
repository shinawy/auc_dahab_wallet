


import  {MasterWallet} from '../src/master_wallet/master_wallet';



import {describe, expect, test} from '@jest/globals';



let master_wallet= new MasterWallet()


describe('Encryption and Decryption', () => {
    
    test('should encrypt and when decrypt we have the original object',async () => {

      let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
      let pass= "macoishere"
    
    
      let keys= await master_wallet.create_master_wallet(my_mnemonic, pass,true);
      let dec_keys= await master_wallet.claim_master_keys(keys,pass);  
    //   let dec_keys_str= JSON.stringify(dec_keys, null,4)
    //   console.log(dec_keys_str)

     
    
      let balance_obj= await master_wallet.get_master_balance(dec_keys)
    //   let balance_str= JSON.stringify(balance_obj, null,4)
      let balance= balance_obj["ETH"]  
      expect(balance).toBe(0.0);
        

    });

});







