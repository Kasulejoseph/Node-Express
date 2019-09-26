import express from 'express'
import sharp from 'sharp'
import User from '../models/user'
import auth from '../middleware/auth'
import upload from '../middleware/upload'
import sendWelcomeEmail from '../emails/account'

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
        sendWelcomeEmail(req.user.email, 'Success...!!', `Your account was deleted, ${req.user.name}. Anything we would have done better?`)
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
        sendWelcomeEmail(user.email, 'Welcome...!!', `Welcome to our app, ${user.name}. Let us if you have any query on how to use it...`)
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

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({
        message: 'Successfully saved!'
    })
}, (err, _req, res, _next) => {
    res.status(400).send({
        status: 400,
        error: err.message
    })
})

router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send({
        'message': 'Delete successfully!!'
    })
})

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            return res.status(404).send({
                error: 'No image found'
            })
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send()
        
    }
})

router.all('/users/me/*', (_req, res, next) => {
    res.status(405).send({
        status: 405,
        error: 'Method Not Allowed'
        
    })
    next()
})

export default router