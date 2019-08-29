import express from 'express'

import Task from '../models/task'

const router = express.Router()

router.post('/task', async (req, res) => {
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

router.get('/task', async (req, res) => {
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

router.get('/task/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updateObj = req.body
    const updates = Object.keys(updateObj)
    const requiredObj = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every((update) => requiredObj.includes(update))

    if(!isValidUpdate) {
        return res.status(400).send({
            status: 400,
            error: 'Invalid Updates Included!!'
        }) 
    }
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(406).send({
            status: 406,
            error: 'Content type should be application/json'
        }) 
    }
    if(!Object.keys(updateObj).length) {        
        return res.status(400).send({
            status: 400,
            error: 'The update object is empty'
        }) 
    }
    
    try {
        const user = await User.findByIdAndUpdate(_id, updateObj, { new: true, runValidators: true})
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
        res.status(400).send({
            status: 400,
            error: error
        }) 
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updateKeys = Object.keys(req.body)
    const requiredKeys = ['desc', 'complete']

    const isValidUpdateObj = updateKeys.every((update) => requiredKeys.includes(update))
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(406).send({
            status: 406,
            error: 'Content type should be application/json'
        }) 
    }
    if(!isValidUpdateObj) {
        return res.status(400).send({
            status: 400,
            error: 'Invalid Updates Included!!'
        }) 
    }
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if(!task) {
            return res.status(404).send({
                status: 404,
                error: `Task With Id ${_id} Is Not Found`
            })
        }
        res.status(200).send({
            status: 200,
            data: task
        })
        
    } catch (error) {
        res.status(400).send({
            status: 400,
            error: error
        })  
    }

})


router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send({
                status: 404,
                error: `User With Id ${req.params.id} Does Not Exist`
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

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send({
                status: 404,
                error: `Task With Id ${req.params.id} Was Not Found.`
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

export default router