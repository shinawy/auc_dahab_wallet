


import  {create_mnemonics} from '../../src/create_mnemonic';
import  {create_seed} from '../../src/create_seed';




import {describe, expect, test} from '@jest/globals';






describe('Create Mnemonic Function', () => {
    
    test('should return array of privateKey and publicKey', async () => {

      
        let my_mnemonic= create_mnemonics()
        const NUM_WORDS_MNEMONIC= 12
        const num_words = my_mnemonic.split(' ').length
        expect(num_words).toBe(NUM_WORDS_MNEMONIC);

    });

});







