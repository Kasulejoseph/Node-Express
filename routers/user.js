import express from 'express'

import User from '../models/user'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({
            status: 201,
            data: user,
            token
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            error: error.message
        })
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send({
        status: 200,
        data: req.user
    }) 
})


router.get('/users/:id', async (req, res) => {
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
        const user = await User.findById(_id, { new: true, runValidators: true})        
        updates.forEach((update) => user[update] = updateObj[update])
        await user.save()
        
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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)  
        const token = await user.generateAuthToken()
        res.status(200).send({
            status: 200,
            message: 'Logged in successfully!!',
            data: user,
            token
        })

    } catch (error) {
        res.status(400).send({
            status: 400,
            error: error
        })
        
    }
})


export default router