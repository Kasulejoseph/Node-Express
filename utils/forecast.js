const request = require('request')

// mapnox.com for lat/log cordinates
const forecast = (lat, log, callback) => {
    const url = `https://api.darksky.net/forecast/894de5b386edf081c860ab089a0f705c/${lat},${log}?units=si`
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (response.body.error) {
            callback(response.body.error, undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
