//index.js
import {Eth} from "./ethereum/eth_class"

export function helloNpm() {
    return "hello NPM"
}; 

export const ETH= new Eth();
  
// module.exports = helloNpm