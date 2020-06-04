const fs = require('fs')
const stock = require('./data/vendor_data')


const getProducts = () => {
    return stock.products.map(item => {
        return {id: item.product.id, name: item.product.name, price: item.product.price}
    })
}

const isMoneyEnoughForSelectedProduct = (product, money) => {
    return product.price < money
}

const dispenseProduct = (id) => {
    const updatedProduct = stock.products.filter(item => item.product.id === id)
        .map(item => {
            if (item.product.id === id) {
                item.product.quantity -= 1
                return {id: item.product.id, name: item.product.name, price: item.product.price}
            }
        })
        .find(p => p.id === id)

    return updatedProduct
}

const getProductById = (productId) => {
    const possibleProduct = stock.products.find(item => item.product.id === parseInt(productId))
    if (possibleProduct !== undefined) return possibleProduct.product
    return undefined
}

module.exports = {
    getProducts, isMoneyEnoughForSelectedProduct, dispenseProduct, getProductById
}