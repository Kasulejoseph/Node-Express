const request = require('request')


const geoCode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location +'.json?access_token=pk.eyJ1Ijoia2FzdWxlam9zZXBoIiwiYSI6ImNqdzRmdGI3aTBqdW00OW1nNm9peXZwMDgifQ.q1_149GP4lS7irY5ZidQ1Q'
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the geo location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try again with different search location!', undefined)
        } else {
            const mapObject = body.features[1]
            callback(undefined, {
                'Longtitude': mapObject.center[0],
                'Latitude': mapObject.center[1],
                'location': mapObject.place_name
            })
        }
    })

}

module.exports = geoCode