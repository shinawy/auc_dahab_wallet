const auc_dahab_wallet= require("auc_dahab_wallet")

const {test_eth}= require("./test_eth")
const {test_sol}= require("./test_sol")
const {test_cspr}= require("./test_cspr")
const {test_polygon}= require("./test_polygon")
const {test_master_wallet}= require("./test_master_wallet")








async function main(){

    let my_mnemonic= "carbon course penalty panda upon forget sunny sword earn volume increase clock"
    let pass= "macoishere"

    await test_master_wallet(my_mnemonic, pass);
    // await test_eth(my_mnemonic);
    // await test_sol(my_mnemonic);
    // await test_cspr(my_mnemonic); 
    // await test_polygon(my_mnemonic);
    

}




(async () => {
    try {
        await main();
        console.log("Code Executed");
  
    } catch (e) {
       console.log (`main returns with this error: ${e}`)
    }
    
  })();






