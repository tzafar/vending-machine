const vendor = require('./vendor')
const cashier = require('./cashier')
const coins = require('./data/coins')
const prompt = require('prompt-sync')();
const statusCodes = require('./helpers/statuscodes')

const displayCoins = () => {
    let coinsContent = ""
    coins.map(coin => {
        coinsContent += coin.id + ") " + coin.symbol + "\t";
    })
    console.log(coinsContent)
}

function insertNextCoin() {
    let insertedCoin = prompt('Select Coin: ')
    const coin = coins.find(c => c.id === parseInt(insertedCoin))
    if (coin === undefined) {
        console.log('Invalid value entered.')
        return 0
    }
    return {coin, insertedMoney: coin.value}
}

const askForMoney = (selectedProduct) => {
    let coins = []
    let totalMoneyInserted = 0
    displayCoins()
    while (totalMoneyInserted < selectedProduct.price) {
        let {coin, insertedMoney} = insertNextCoin()
        coins.push(coin)
        totalMoneyInserted += insertedMoney
    }
    return {coins, totalMoneyInserted}
}

const displayProducts = () => vendor.getProducts().forEach(product => {
    console.log(product.id, "\t", product.name, "\t\t", '£' + (product.price / 100).toFixed(2))
})

let productId = undefined

while (true) {
    displayProducts()
    const productId = prompt('Please select a product, x to exit: ')
    if (productId === "x") {
        break;
    }

    const selectedProduct = vendor.getProductById(productId)

    if (selectedProduct === undefined) {
        console.log("Invalid input")
        continue
    }

    const {coins, totalMoneyInserted} = askForMoney(selectedProduct)
    const dispensedProduct = vendor.dispenseProduct(selectedProduct.id)

    if (dispensedProduct !== undefined) {
        cashier.deposit(coins)
        const response = cashier.deduct(totalMoneyInserted, selectedProduct.price)
        switch (response.status) {
            case statusCodes.PURCHASE_COMPLETE:
                console.log("Thanks for purchase")
                break;
            case statusCodes.NO_CHANGE_AVAILABLE:
                console.log("Thanks for purchase, There is no change available. To make further purchases select the item")
                break;
            case statusCodes.CHANGE_GIVEN:
                console.log("Thanks for purchase, Please collect your change. To make further purchases select the item")
                break;
            default:
                console.log("Something went wrong. Please try again later")
        }
    }
}