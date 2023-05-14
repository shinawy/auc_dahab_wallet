# auc_dahab_wallet
This is the npm package for auc dahab wallet. It is a full-featured crypto-wallet to secure and save your funds

# Installation
```
npm install --save auc_dahab_wallet
```

# APIS
Please see the examples directory on Github to see how to use the library
## Using auc_dahab_wallet
```
const auc_dahab_wallet= require("auc_dahab_wallet")
```
## MasterWallet Class

### Json Types
```
export interface IDictionary<TValue> {

    [id: string]: TValue

}

export interface ChainsInfo <TValue> {

    [id: string]: IDictionary<TValue>
    
}
```
### Creating an object from the class
```
let master_wallet= new auc_dahab_wallet.MasterWallet()
```
### MasterWallet.create_master_wallet
this function returns the json with the chain information either encrypted or not encrypted to be ready for storing in a file 
```
async create_master_wallet (master_mnemonic: string, password: string, return_encrypted_keys: boolean)
```

### MasterWallet.get_master_balance
this function takes the json with the chain information obtained from claim_master_keys
it returns a json with the balances for all chains

```
async get_master_balance(info_obj: ChainsInfo<string>)
```

### MasterWallet.claim_master_keys
this function takes the encrypted json with the chain information obtained from create_master_keys and the password the user used to encrypt the keys
it returns the decrypted version of the json input with all the keys plain text

```
async claim_master_keys(info_obj: ChainsInfo<string>, password: string)
```


## Eth Class

### Creating an object from the class
```
let eth_cls= new auc_dahab_wallet.Eth()
```

### Eth.create_wallet
this function returns an array of strings contains [privateKey, publicKey]
```
create_wallet (master_mnemonic: string)
```

### Eth.get_balance
this function returns the balance with a certain publicKey
```
async get_balance(publicKey: string)
```

### Eth.send_transaction
this function performs a send transaction from a certain account to another 
```
async send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string)
```

## Sol Class

### Creating an object from the class
```
let sol_cls= new auc_dahab_wallet.Sol()
```

### Sol.create_wallet
this function returns an array of strings contains [privateKey, publicKey]
```
create_wallet (master_mnemonic: string)
```

### Sol.get_balance
this function returns the balance with a certain publicKey
```
async get_balance(publicKey: string)
```

### Sol.send_transaction
this function performs a send transaction from a certain account to another 
```
async send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string)
```

## Cspr Class

### Creating an object from the class
```
let cspr_cls= new auc_dahab_wallet.Cspr()
```

### Cspr.create_wallet
this function returns an array of strings contains [privateKey, publicKey]
```
async create_wallet (master_mnemonic: string)
```

### Cspr.get_balance
this function returns the balance with a certain publicKey
```
async get_balance(publicKey: string)
```

### Cspr.send_transaction
this function performs a send transaction from a certain account to another 
```
async send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string)
```


## Polygon Class

### Creating an object from the class
```
let polygon_cls= new auc_dahab_wallet.Polygon()
```

### Polygon.create_wallet
this function returns an array of strings contains [privateKey, publicKey]
```
 create_wallet (master_mnemonic: string)
```

### Polygon.getPolygonMaticBalance
this function returns the Matic balance with a certain publicKey
```
async getPolygonMaticBalance(publicKey: string)
```

### Polygon.getPolygonWethBalance
this function returns the Weth balance with a certain publicKey, and privateKey
```
async getPolygonWethBalance(publicKey: string, privateKey: string)
```

### Polygon.send_transaction
this function performs a send transaction from a certain account to another 
```
async send_transaction(sender_priv_key: string, receiver_pub_key: string, amount: string)
```


