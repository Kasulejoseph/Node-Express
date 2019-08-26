import express from 'express'
import './src/db/mongoose'
import User from './models/user'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send({
            status: 200,
            data: user
        })
    }).catch((e) => {
        res.status(400).send({
            status: 400,
            error: e.message
        })
    })
})

app.listen(port, () => {
    console.log(`Runing on port ${port}`);
    
})