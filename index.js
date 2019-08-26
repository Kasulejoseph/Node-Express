import express from 'express'
import './src/db/mongoose'
import User from './models/user'
import Task from './models/task'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send({
            status: 201,
            data: user
        })
    }).catch((e) => {
        res.status(400).send({
            status: 400,
            error: e.message
        })
    })
})

app.post('/task', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send({
            status: 201,
            data: task
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