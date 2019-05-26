const request = require('request')
const chalk = require('chalk')

const url = 'https://api.darksky.net/forecast/894de5b386edf081c860ab089a0f705c/37.8267,-122.423344'
const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/kampala.json?access_token=pk.eyJ1Ijoia2FzdWxlam9zZXBoIiwiYSI6ImNqdzRmdGI3aTBqdW00OW1nNm9peXZwMDgifQ.q1_149GP4lS7irY5ZidQ1Q'

request({ url: url, json: true}, (error, response) => {
    if (error) {
        console.log(chalk.red.inverse('Unable to connect to the weather service!'))
    } else if (response.body.error) {
        console.log(chalk.red.inverse(response.body.error))
    } else {
        console.log(chalk.green('It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.'))
    }
})

request({url: geoUrl, json: true}, (error, response) => {
    if(error) {
        console.log(chalk.red.inverse('Unable to connect to the geo location service!'))
    } else if (response.body.features.length === 0) {
        console.log(chalk.red.inverse('Unable to find location, try again with different search location!'))
    } else {
        const mapObject = response.body.features[1]
        console.log(chalk.yellow('Longtitude: ' + mapObject.center[0] + ', Latitude: ' + mapObject.center[1] ))
    }
})