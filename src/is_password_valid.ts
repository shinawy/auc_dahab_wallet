import CryptoJS from "crypto-js";

function is_password_valid(password: string){

    var cipher;
    cipher = window.localStorage.getItem('passFile');
    var decipher = CryptoJS.AES.decrypt(cipher, password);
    let decipher_str = decipher.toString(CryptoJS.enc.Utf8);
    if (decipher_str === "DahabIsTheSecretKey"){

        return true;

    } else {

        return false;

    }
}

export default is_password_valid;
