import express from 'express'
import path from 'path'
import hbs from 'hbs'

import foreCast from './utils/forecast'
import geoCode from './utils/geocode'

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// sETUP HANDLEBARS ENGINE and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirPath))
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Kasule Joe',
        desc: 'Get started with this amazing weather app'
    })
})

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 29
//     })
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kasule Joe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: `Let's help you...`,
        message: 'Having trouble connecting to the WIFI, download kasule!',
        name: 'Kasule Joe'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No query params provided'
        })
    }
    geoCode(req.query.address, (error, {Latitude, Longtitude, location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        foreCast(Latitude, Longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast: forecastData
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: `404...`,
        error404: 'Help article not found',
        name: 'Kasule Joe'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: `404...`,
        error404: '404, page not found.',
        name: 'Kasule Joe'
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

export default app