const request = require('request')
const chalk = require('chalk')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
const location = process.argv[2]

if (!location) {
    console.log('Please! provide an address')
} else {
    geoCode(location, (error, response) => {
        if (error) {
            return console.log(chalk.red.inverse(error))
        }
        console.log('Data', response)
        foreCast(response.Latitude, response.Longtitude, (error, response) => {
            if (error) {
               return console.log(chalk.red.inverse(error))
            }
            return console.log(chalk.green(response))
        })
    })
    
}

// run `node app.js location_name`