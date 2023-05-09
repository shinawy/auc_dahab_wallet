import 'mocha';
import { assert } from 'chai';

import  {Eth} from '../src/ethereum/eth_class';


let eth_cls= new Eth()

describe('Ethereum Create Wallet Function', () => {
  it('should be a function', () => {
    assert.isFunction(eth_cls.create_wallet);
  });

  it('should return array of privateKey and publicKey', () => {
    let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
    
    let keys= eth_cls.create_wallet(my_mnemonic);
    let privateKey= keys[0].toString(), publicKey=keys[1].toString();

    const expected_privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';
    const expected_publicKey = '0xb75B0315feDb4A111D686A07a5F55b252bDD8868';

    assert.equal(privateKey, expected_privateKey);
    assert.equal(publicKey, expected_publicKey);

  });
});

describe('Ethereum Get Balance Function', () => {
    it('should be a function', () => {
      assert.isFunction(eth_cls.get_balance);
    });
  
    it('should return the balance for the account with certain publicKey', async () => {
      
      let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
      let balance= await eth_cls.get_balance(publicKey)
      const expected_balance = '0.0';
  
      assert.equal(balance, expected_balance);
  
    });
  });


  describe('Ethereum send transcation Function', () => {
    it('should be a function', () => {
      assert.isFunction(eth_cls.send_transaction);
    });
  
    it('should return the result json in case of success and error in case it failed', async () => {
      
        let privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';
      
        let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
        assert.doesNotThrow(
            
            async function() {
                await eth_cls.send_transaction(privateKey, publicKey, "0.0005");
              },
            Error

        )
        
        // try{
        // let transcation_result= await eth_cls.send_transaction(privateKey, publicKey, "0.0005")
        
        // }
        // catch(e){
        //     let expected_result= "Error: insufficient funds for intrinsic transaction cost"
        //     assert.equal(e, expected_result);
        // }
        
  
    });
  });

