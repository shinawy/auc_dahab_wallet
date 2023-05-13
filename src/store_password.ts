import CryptoJS from "crypto-js";

function store_password(password: string){

    let key = "DahabIsTheSecretKey";

    var cipher = CryptoJS.AES.encrypt(key, password);
    let cipher_str = cipher.toString();
    let storing_obj = {
        'passFile': cipher_str,
    }
    return storing_obj;
    
}

export default store_password;
