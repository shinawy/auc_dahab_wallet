


import  {MasterWallet} from '../../src/master_wallet/master_wallet';



import {describe, expect, test} from '@jest/globals';



let master_wallet= new MasterWallet()


describe('Encryption and Decryption', () => {
    
    test('should encrypt and when decrypt we have the original object',async () => {

      let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
      let pass= "macoishere"
    
    
    //   let keys= await master_wallet.create_master_wallet(my_mnemonic, pass,true);
    //   let dec_keys= await master_wallet.claim_master_keys(keys,pass);  
    //   let dec_keys_str= JSON.stringify(dec_keys, null,4)
    //   console.log(dec_keys_str)

      let key_obj= {
        "ETH": {
            "ETH_publicKey": "0xb75B0315feDb4A111D686A07a5F55b252bDD8868",
            "ETH_privateKey": "0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b"
        },
        "SOL": {
            "SOL_publicKey": "69ef1WyEHve8mbAFzZKZ2dENuEiVAzrbvqL2fFop3qmF",
            "SOL_privateKey": "9e1fd8e04304ab017d188bdebf434a9cd0248222c438f68ed83c445e4456fea34c81a87a5ed781aa00cf34165a829b3e123b202743ff5f596292b87a3e217b46"
        },
        "CSPR": {
            "CSPR_publicKey": "03dfd147cf1b317d08aac2f0448a63cf8038ffdd8b6fa7063617dcb35cdde1c08c",
            "CSPR_privateKey": "5dbcbfe0b4174540462d318fcced6b1764b3d85d4ef8b28148bdea015bc1f184"
        },
        "MATIC": {
            "MATIC_publicKey": "0xb75B0315feDb4A111D686A07a5F55b252bDD8868",
            "MATIC_privateKey": "0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b"
        }
    }
    
      let balance_obj= await master_wallet.get_master_balance(key_obj)
      let balance_str= JSON.stringify(balance_obj, null,4)
      let balance= balance_obj["ETH"]  
      expect(balance).toBe(0.0);
        

    });

});







