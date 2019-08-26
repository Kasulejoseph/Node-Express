import express from 'express'
import './src/db/mongoose'
import User from './models/user'
import Task from './models/task'
import { log } from 'util';

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

app.get('/users', (req, res) => {
    let userCount;
    User.countDocuments({}, (error, count) => {
        userCount = count
        
    });
    
    User.find({}).then((users) => {
        res.status(200).send({
            status: 200,
            user_count: userCount,
            data: users
        })

    }).catch((error) => {
        res.status(500).send({
            status: 500,
            error: error
        })

    })
})


app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {        
        if(!user) {
            return res.status(404).send({
                status: 404,
                error: 'User Not Found'
            })
        }
        res.status(200).send({
            status: 200,
            data: user
        })
    }).catch((error) => {
        res.status(404).send({
            status: 404,
            error: error
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