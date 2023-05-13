


import  {Polygon} from '../src/polygon/polygon_class';



import {describe, expect, test} from '@jest/globals';



let polygon_cls= new Polygon()


describe('Polygon Create Wallet Function', () => {
    
    test('should return array of privateKey and publicKey', async () => {

      let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
    
      let keys= polygon_cls.create_wallet(my_mnemonic);
      let privateKey= keys[0], publicKey=keys[1];
  
      const expected_privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';
      const expected_publicKey = '0xb75B0315feDb4A111D686A07a5F55b252bDD8868';
  
        expect(privateKey).toBe(expected_privateKey);
        expect(publicKey).toBe(expected_publicKey);

    });

});





describe('Polygon getPolygonMaticBalance Function', () => {
    
    test('should return the balance for the account with certain publicKey', async () => {
      
      let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
      let balance= await polygon_cls.getPolygonMaticBalance(publicKey)
      const expected_balance = 0.0;
        
    
        expect(balance).toBe(expected_balance);
       

    });

});

describe('Polygon getPolygonWethBalance Function', () => {
    
    test('should return the balance for the account in Weth', async () => {
    
    
        let privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';  
        let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
        let balance= await polygon_cls.getPolygonWethBalance(publicKey, privateKey);
        const expected_balance = 0.0;
            
        
        expect(balance).toBe(expected_balance);
       

    });

});


describe('Polygon send transcation Function', () => {

    test('should return the result json in case of success and error in case it failed', async () => {

      let privateKey = '0xa3e16969d0e084fffe970902b72b2cf5c0def19b8084fe80def6f5a2ee70b14b';
      
      let publicKey="0xb75B0315feDb4A111D686A07a5F55b252bDD8868"
        
        // not sufficient balance
        expect(async () => {await polygon_cls.send_transaction(privateKey, publicKey, "0.001")}).rejects.toThrow(Error);
        

    });
    
});

