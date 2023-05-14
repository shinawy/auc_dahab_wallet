const auc_dahab_wallet= require("auc_dahab_wallet")


async function test_polygon(){

    try{

        console.log("Testing Polygon: ....")


        let polygon_cls= new auc_dahab_wallet.Polygon()
        let keys= await polygon_cls.create_wallet(my_mnemonic);
        let privateKey= keys[0], publicKey=keys[1];
        console.log (`privateKey: ${privateKey}, publicKey: ${publicKey}`)

        let maticbalance= await polygon_cls.getPolygonMaticBalance(publicKey)
        console.log (`maticbalance: ${maticbalance}`)

        let wethbalance= await polygon_cls.getPolygonWethBalance(publicKey, privateKey)
        console.log (`wethbalance: ${wethbalance}`)

        
        await polygon_cls.send_transaction(privateKey, publicKey, "0.0005")
        
    
    }
    catch(e){

        console.log("Polygon returns with an error: ", e)
    }

}

module.exports= {test_polygon}