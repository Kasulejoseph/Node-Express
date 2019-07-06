const request = require('request')
const chalk = require('chalk')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
const location = process.argv[2]

if (!location) {
    console.log('Please! provide an address')
} else {
    geoCode(location, (error, {Latitude, Longtitude, location}) => {
        if (error) {
            return console.log(chalk.red.inverse(error))
        }
        foreCast(Latitude, Longtitude, (error, forecastData) => {
            if (error) {
               return console.log(chalk.red.inverse(error))
            }
            console.log(chalk.yellow(location))
            console.log(chalk.green(forecastData))
        })
    })
    
}


// run `node app.js location_name`