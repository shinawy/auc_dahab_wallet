// import 'mocha';

import {describe, expect, test} from '@jest/globals';

import  {Sol} from '../src/index';
import {create_seed} from "../src/create_seed"

let sol_cls= new Sol()


describe('Solana Create Wallet Function', () => {
    
    test('should return array of privateKey and publicKey', async () => {

        let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
        const my_seed =  await create_seed(my_mnemonic)
        let keys= sol_cls.create_wallet(my_seed);
        let privateKey= keys[0], publicKey=keys[1];

        const expected_privateKey = '9e1fd8e04304ab017d188bdebf434a9cd0248222c438f68ed83c445e4456fea34c81a87a5ed781aa00cf34165a829b3e123b202743ff5f596292b87a3e217b46';
        const expected_publicKey = '69ef1WyEHve8mbAFzZKZ2dENuEiVAzrbvqL2fFop3qmF';

        expect(privateKey).toBe(expected_privateKey);
        expect(publicKey).toBe(expected_publicKey);

    });

});





describe('Solana Get Balance Function', () => {
    
    test('should return the balance for the account with certain publicKey', async () => {

        let publicKey="69ef1WyEHve8mbAFzZKZ2dENuEiVAzrbvqL2fFop3qmF"
        let balance= await sol_cls.get_balance(publicKey)
        const expected_balance = 0.0;
    
        expect(balance).toBe(expected_balance);
       

    });

});


describe('Solana send transcation Function', () => {

    test('should return the result json in case of success and error in case it failed', async () => {

        let privateKey = '9e1fd8e04304ab017d188bdebf434a9cd0248222c438f68ed83c445e4456fea34c81a87a5ed781aa00cf34165a829b3e123b202743ff5f596292b87a3e217b46';
        let publicKey = '69ef1WyEHve8mbAFzZKZ2dENuEiVAzrbvqL2fFop3qmF';
        
        
        // not sufficient balance
        expect(async () => {await sol_cls.send_transaction(privateKey, publicKey, "0.001")}).rejects.toThrow(Error);
        

    });
    
});
