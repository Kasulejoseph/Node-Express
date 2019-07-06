const request = require('request')

// mapnox.com for lat/log cordinates
const forecast = (lat, log, callback) => {
    const url = `https://api.darksky.net/forecast/894de5b386edf081c860ab089a0f705c/${lat},${log}?units=si`
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.summary+ 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
