//index.js
export {Eth} from "./ethereum/eth_class"
export {Sol} from "./solana/sol_class"
export {Cspr} from "./casper/cspr_class"
export {Polygon} from "./polygon/polygon_class"

export {create_mnemonics} from "./create_mnemonic"
export {create_seed} from "./create_seed"

export function helloNpm() {
    return "hello NPM"
}; 


  
// module.exports = helloNpm