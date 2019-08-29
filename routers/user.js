import express from 'express'

import User from '../models/user'

const router = express.Router()

router.post('/users', async (req, res) => {
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

router.get('/users', async (req, res) => {
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

export default router