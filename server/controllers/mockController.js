const data = require('./mockdata.json')

module.exports = {
    getMockInfo(req, res) {
        // Give me a number somewhere in the index range of our mock data.
        // We are going to use this to grab a random systemInfo object out of our JSON mockdata.
        const index = Math.floor(Math.random() * 100)
        const systemInfo = data[index]

        res.status(200).send(systemInfo)
    }
}