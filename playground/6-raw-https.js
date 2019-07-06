const https = require('https')

const url = 'https://api.darksky.net/forecast/894de5b386edf081c860ab089a0f705c/31,-100?units=si'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chuck) => {
        data = data + chuck.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.end()