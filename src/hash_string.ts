import  { lib,PBKDF2, algo} from 'crypto-js'

export function generateKeyFromPassword(password: string, length: number ,salt: lib.WordArray){



    let iterations = 1000;
    let single_hash=  PBKDF2(password, salt, {iterations:iterations, keySize: length, hasher: algo.SHA512} );
    let double_hash=  PBKDF2(single_hash, salt, {iterations:iterations, keySize: length, hasher: algo.SHA512} );

    
   
    return [ single_hash, double_hash];


}
