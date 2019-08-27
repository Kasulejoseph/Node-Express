import express from 'express'
import './src/db/mongoose'
import User from './models/user'
import Task from './models/task'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({
            status: 201,
            data: user
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            error: error.message
        })
    }
})

app.get('/users', async (req, res) => {
    try {
        const user_count =  await User.countDocuments({})
        const users = await User.find({})
        res.status(200).send({
            status: 200,
            user_count: user_count,
            data: users
        }) 
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error
        }) 
    }
})


app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
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
        
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error
        })
    }
})

app.post('/task', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send({
            status: 201,
            data: task
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            error: error.message
        })
    }
})

app.get('/task', async (req, res) => {
    try {
        const task_count = await Task.countDocuments({})
        const tasks = await Task.find({})
        res.status(200).send({
            status: 200,
            task_count: task_count,
            data: tasks
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error
        })
    }
})

app.get('/task/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send({
                status: 404,
                data: `Task with id ${_id} Not Found`
            })
        }
        res.status(200).send({
            status: 200,
            data: task
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error
    })    
    }
})

app.listen(port, () => {
    console.log(`Runing on port ${port}`);
    
})