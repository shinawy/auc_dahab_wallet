


import  {Eth} from '../src/index';



import {describe, expect, test} from '@jest/globals';



let eth_cls= new Eth()


describe('Ethereum Create Wallet Function', () => {
    
    test('should return array of privateKey and publicKey', async () => {

      let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
    
      let keys= eth_cls.create_wallet(my_mnemonic);
      let privateKey= keys[0].toString(), publicKey=keys[1].toString();
  
      const expected_privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';
      const expected_publicKey = '0xb75B0315feDb4A111D686A07a5F55b252bDD8868';
  
        expect(privateKey).toBe(expected_privateKey);
        expect(publicKey).toBe(expected_publicKey);

    });

});





describe('Ethereum Get Balance Function', () => {
    
    test('should return the balance for the account with certain publicKey', async () => {
      
      let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
      let balance= await eth_cls.get_balance(publicKey)
      const expected_balance = '0.0';
        
    
        expect(balance).toBe(expected_balance);
       

    });

});


describe('Ethereum send transcation Function', () => {

    test('should return the result json in case of success and error in case it failed', async () => {

      let privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';
      
      let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
        
        // not sufficient balance
        expect(async () => {await eth_cls.send_transaction(privateKey, publicKey, "0.001")}).rejects.toThrow(Error);
        

    });
    
});

