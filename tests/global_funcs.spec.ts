


import  {create_mnemonics} from '../src/create_mnemonic';
import  {create_seed} from '../src/create_seed';
import {validateMnemonic} from 'bip39'


import {describe, expect, test} from '@jest/globals';






describe('Create Mnemonic Function', () => {
    
    test('should return array of privateKey and publicKey', async () => {

      
        let my_mnemonic= create_mnemonics()
        let is_valid_mnemonic= validateMnemonic(my_mnemonic)
        expect(is_valid_mnemonic).toBe(true);

    });

});


describe('Create Seed Function',  () => {
    
    test('should return array of privateKey and publicKey', async () => {

      
        let my_mnemonic= create_mnemonics()
        let my_seed= await create_seed(my_mnemonic)
        const NUM_Bytes= 32
        expect(my_seed.length).toBe(NUM_Bytes);

    });

});









