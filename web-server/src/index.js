const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

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
    res.send({
        forecast: 'it is about morning',
        location: 'kigali',
        name: 'Kasule Joe'
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

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})