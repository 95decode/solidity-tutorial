const Web3 = require('web3');
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const contractAbi = require('./abi/helloWorld.json');
const contractAddress = "0xCDf4d85f47d6eBda73CfDdB8344753DA6cE8792D";
const contract = new web3.eth.Contract(contractAbi, contractAddress)

// The private key is hardcoded, but it is only for testing in this repository
const privateKey = "a2a52c9e9a259dbb5adfee96c3623cf08c1cef9308548335f54955b5ab748259";
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
web3.eth.accounts.wallet.add(account);

const text = "foo";

// Request transaction
contract.methods.modifyText(text).send({
    from: account.address,
    gas: 210000
}).on('transactionHash', function(hash){
    console.log("Tx hash : " + hash);
})

// Query
contract.methods.readText(account.address).call()
.then(function(res){
    console.log("Text : " + res);
})
