import request from 'request'
import dotenv from 'dotenv'
dotenv.config();

const geoCode = (location, callback) => {
    const url = `${process.env.GEOCODINGURL}` + location +'.json?access_token='+ process.env.ACCESSTOKEN
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

export default geoCode