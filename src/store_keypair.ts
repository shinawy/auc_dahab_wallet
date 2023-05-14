// import { twofish } from 'twofish'
import { lib } from 'crypto-js'

// import { saveAs } from 'file-saver';
import { byteArrayToString, stringToByteArray } from './bytearray_converter'
import { generateKeyFromPassword } from './hash_string'
import {encrypt,decrypt, makeSession} from 'twofish-ts'

export  async function store_keypair (chain_prefix: string, publicKey: string, privateKey: string, length: number, password: string)  {
  try {

    let salt = lib.WordArray.random(length);
    let salt_words = new Uint8Array(salt["words"])
    let stored_salt32 = `${salt}`
    let stored_salt8 = byteArrayToString(salt_words)

    let privateKeyArray = stringToByteArray(privateKey)
    let publicKeyArray = stringToByteArray(publicKey) // This assumes that the public key has no 0x prefix
    console.log('storing_pass........')
    // this needs to return an object for a better design
    let hashing_info = generateKeyFromPassword(password, length, salt)

    let single_hash = hashing_info[0]
    let double_hash = hashing_info[1]


    

    let key_encfile = new Uint8Array(lib.WordArray.random(length)["words"]);    // this is k1 the one we will use to encrypt the file content
    var twF_session = makeSession(key_encfile); 
    let cipher_private_key: Uint8Array= privateKeyArray;;
    encrypt(privateKeyArray,0,cipher_private_key,0,twF_session)
    let stored_private_key = byteArrayToString(new Uint8Array(cipher_private_key))
    
    let cipher_public_key: Uint8Array= publicKeyArray;
    encrypt(publicKeyArray,0,cipher_public_key,0,twF_session)
    let stored_public_key = byteArrayToString(new Uint8Array(cipher_public_key))

    


    let twF_encKey_session= makeSession(new Uint8Array(single_hash["words"]))
    let enc_key_encrypted: Uint8Array= key_encfile;
    encrypt(key_encfile,0,enc_key_encrypted,0,twF_encKey_session)


    let stored_enc_key = byteArrayToString(new Uint8Array(enc_key_encrypted))
    let stored_dhash = byteArrayToString(new Uint8Array(double_hash["words"]))
    // begin
    let chain_name_hashed = generateKeyFromPassword(`${chain_prefix}`, length, salt)[1].toString()
    let chain_name_pub_hashed = generateKeyFromPassword(`${chain_prefix}_publicKey`, length, salt)[1].toString()
    let chain_name_priv_hashed = generateKeyFromPassword(`${chain_prefix}_privKey`, length, salt)[1].toString()
    let enc_key_name_hashed = generateKeyFromPassword(`enc_key`, length, salt)[1].toString()
    let dhash_pass_name_hashed = generateKeyFromPassword(`dhash_pass`, length, salt)[1].toString()


    let storing_obj = {
      [enc_key_name_hashed]: stored_enc_key,
      "salt32": stored_salt32,
      "salt8": stored_salt8,
      [dhash_pass_name_hashed]: stored_dhash,
      [chain_name_hashed]: {

        [chain_name_pub_hashed]: stored_public_key,
        [chain_name_priv_hashed]: stored_private_key
      }

    }

    let storing_obj_string = JSON.stringify(storing_obj);
    // var blob = new Blob([storing_obj_string], { type: "text/plain;charset=utf-8" });
    // console.log("blob: ", blob)
    // let filename = `${chain_name_hashed}.txt` // to be changed later to be encrypted or have a code for each chain to be user non-readable
    // saveAs(blob, filename);

    // window.localStorage.setItem(`${chain_prefix}_info`, storing_obj_string);

    return storing_obj;

  } catch (err) {
    return false;
  }
}

