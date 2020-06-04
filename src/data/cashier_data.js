const data = [
    {
        type: "1p",
        quantity: 10,
        value: 1
    },
    {
        type: "2p",
        quantity: 10,
        value: 2
    },
    {
        type: "5p",
        quantity: 10,
        value: 5
    },
    {
        type: "10p",
        quantity: 10,
        value: 10
    },
    {
        type: "20p",
        quantity: 10,
        value: 20
    },
    {
        type: "50p",
        quantity: 10,
        value: 50
    },
    {
        type: "1pd",
        quantity: 10,
        value: 100
    },
    {
        type: "2pd",
        quantity: 10,
        value: 200
    }
]

const sorter = (a, b) => {
    if (a.value > b.value) {
        return -1
    }
    return 0
}


module.exports = data.sort(sorter)