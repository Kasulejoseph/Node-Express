import request from 'request'
import dotenv from 'dotenv'
dotenv.config();

// mapnox.com for lat/log cordinates
const forecast = (lat, log, callback) => {
    const url = `${process.env.FORECASTURL}${lat},${log}?units=si`
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {            
            callback(undefined, body.daily.summary+ 'It is currently ' +
            body.currently.temperature + ' degrees out. There is a ' +
            body.currently.precipProbability + '% chance of rain.')
        }
    })
}

export default forecast
