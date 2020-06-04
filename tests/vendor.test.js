const vendor = require('../src/vendor')

const product = {
    id: 1,
    name: "Twix",
    price: 199
}

test('vendor should be able to tell if enough money is not inserted', () => {
    const money = 200;
    const response = vendor.isMoneyEnoughForSelectedProduct(product, money)
    expect(response).toBe(true)
})

test('vendor should be able to tell if money inserted for the product is not enough', () => {
    const money = 100;
    const response = vendor.isMoneyEnoughForSelectedProduct(product, money)
    expect(response).toBe(false)
});

test('should load the products successfully', () => {
    const products = vendor.getProducts()
    expect(products).not.toBe(undefined)
    expect(products.length).not.toBe(0)
    expect(products[0].quantity).toBe(undefined)
    expect(products[0].id).not.toBe(undefined)
    expect(products[0].name).not.toBe(undefined)
    expect(products[0].price).not.toBe(undefined)
})

test('should dispense selected product', function () {
    const maybeDispensedProduct = vendor.dispenseProduct(product.id)
    expect(maybeDispensedProduct).not.toBe(undefined)
    expect(maybeDispensedProduct.id).toBe(1)
});