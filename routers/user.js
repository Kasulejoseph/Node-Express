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
    await req.user.populate('tasks').execPopulate()
    res.status(200).send({
        status: 200,
        data: {user: req.user, tasks: req.user.tasks}
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

router.patch('/users/me', auth, async (req, res) => {
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
        const user = req.user       
        updates.forEach((update) => user[update] = updateObj[update])
        await user.save()
        res.status(200).send({
            status: 200,
            message: 'success',
            data: req.user
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            error
        }) 
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send({
            status: 200,
            message: 'successfully removed.. ',
            data: req.user
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


router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({
            message: 'logged out'
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    } 
})

router.post('/users/logoutAll', auth, async(req, res) => {
    req.user.tokens = []

    try {
        await req.user.save()
        res.send({
            message: 'logged out all'
        }) 
    } catch (error) {
        res.status(500).send({
            error
        })
    }
})

export default router