let data = require('./data/cashier_data')
const MachineResponseStatus = require('./helpers/status')
const statusCodes = require('./helpers/statuscodes')

const deduct = (moneyProvided, price) => {
    let dataSnapshot = data;
    let remaining = moneyProvided - price

    if (remaining === 0) {
        data = dataSnapshot
        return new MachineResponseStatus(statusCodes.PURCHASE_COMPLETE)
    } else {

        dataSnapshot.map(cat => {
            while (remaining >= cat.value && cat.quantity > 0) {
                cat.quantity -= 1
                remaining -= cat.value
            }
        })

        if (remaining > 0) {
            return new MachineResponseStatus(statusCodes.NO_CHANGE_AVAILABLE)
        } else {
            return new MachineResponseStatus(statusCodes.CHANGE_GIVEN)
        }
    }
}

const deposit = (coins) => {
    let updatedCoins = []
    coins.forEach(coin => {
        data.filter(item => item.value === coin.value)
            .map(item => {
                item.quantity += 1
                updatedCoins.push(coin.id)
            })
    })

    return updatedCoins
}

module.exports = {
    deduct, deposit
}