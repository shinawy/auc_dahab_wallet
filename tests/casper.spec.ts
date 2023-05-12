// import 'mocha';

import {describe, expect, test} from '@jest/globals';

import  {Cspr} from '../src/casper/cspr_class';
import {create_seed} from "../src/create_seed"

let cspr_cls= new Cspr()


describe('Casper Create Wallet Function', () => {
    
    test('should return array of privateKey and publicKey', async () => {

        let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
        const my_seed =  await create_seed(my_mnemonic)
        let keys= await cspr_cls.create_wallet(my_seed);
        let privateKey= keys[0], publicKey=keys[1];

        const expected_privateKey = '5dbcbfe0b4174540462d318fcced6b1764b3d85d4ef8b28148bdea015bc1f184';
        const expected_publicKey = '03dfd147cf1b317d08aac2f0448a63cf8038ffdd8b6fa7063617dcb35cdde1c08c';

        expect(privateKey).toBe(expected_privateKey);

        expect(publicKey).toBe(expected_publicKey);

    });

});





describe('Casper Get Balance Function', () => {
    
    test('should return the balance for the account with certain publicKey', async () => {

        let publicKey="03dfd147cf1b317d08aac2f0448a63cf8038ffdd8b6fa7063617dcb35cdde1c08c"
        let balance= await cspr_cls.get_balance(publicKey)
        const expected_balance = 0.0;
    
        expect(balance).toBe(expected_balance);
       

    });

});


describe('Casper send transcation Function', () => {

    test('should return the result json in case of success and error in case it failed', async () => {

        let privateKey = '5dbcbfe0b4174540462d318fcced6b1764b3d85d4ef8b28148bdea015bc1f184';
        let publicKey = '03dfd147cf1b317d08aac2f0448a63cf8038ffdd8b6fa7063617dcb35cdde1c08c';
        
        
        // not sufficient balance
        expect(async () => {await cspr_cls.send_transaction(privateKey, publicKey, "0.001")}).rejects.toThrow(Error);
        

    });
    
});
