import User from '../models/user'
import sendWelcomeEmail from '../emails/account'

class Users{
    constructor() {
        // this.state = {};  
    }
    static async createUser(req, res) {
        const user = new User(req.body)
        sendWelcomeEmail(user.email, 'Welcome...!!', `Welcome to our app, ${user.name}. Let us if you have any query on how to use it...`)
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
    }

    static async getUserProfile(req, res) {
        try {
            await req.user.populate('tasks').execPopulate()
            res.status(200).send({
                status: 200,
                data: {user: req.user, tasks: req.user.tasks}
            })
            
        } catch (error) {
            res.status(500).send({
                status: 500,
                error: 'Oops.. something went wrong'
            })  
        }

    }

    static async getUserByIds(req, res) {
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
    }

    static async updateUserProfile(req, res) {
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
    }

    static async deleteUserProfile(req, res) {
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
    }

    static async loginUser(req, res) {
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
    }

    static async logoutUser(req, res) {
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
    }

    static async logoutAllDevices(req, res) {
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
    }

    static async deleteAvatar(req, res) {
        if(!req.user.avatar) {
            return res.send({
                Message: 'User has no avatar'
            })
        }
        req.user.avatar = undefined
        await req.user.save()
        res.send({
            'message': 'Delete successfully!!'
        })
    }

    static async getAvatar(req, res) {
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
    }
}

export default Users