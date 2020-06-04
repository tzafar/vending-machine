const cashier = require('../src/cashier');
const statusCodes = require('../src/helpers/statuscodes');

test('should make successful purchase when exact money inserted', () => {
    const response = cashier.deduct(200, 200)
    expect(response.status).toBe(statusCodes.PURCHASE_COMPLETE)
})

test('should tell if no change is available', () => {
    // make a few identical transactions so machine runs out of change
    for (let i = 0; i < 8; i++) {
        cashier.deduct(200, 5)
    }

    // unsuccessful transaction
    const response = cashier.deduct(200, 5)
    expect(response.status).toBe(statusCodes.NO_CHANGE_AVAILABLE)
})

test('should return correct change', () => {
    const response = cashier.deduct(200, 100)
    expect(response.status).toBe(statusCodes.CHANGE_GIVEN)
})

test('should deposit coins into machine correctly', async () => {
    const coins = [
        {
            id: 3,
            symbol: "1p",
            value: 1

        }
    ]

    const updatedCoins =  cashier.deposit(coins)
    expect(updatedCoins.indexOf(coins[0].id)).toBe(0)

})
