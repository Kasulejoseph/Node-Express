import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.post('/users', (req, res) => {
    res.send('Hello there')
})

app.listen(() => {
    console.log(`Runing on port ${port}`);
    
})