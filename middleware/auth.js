import jwt from 'jsonwebtoken'
import User from '../models/user'
import dotevn from 'dotenv'

dotevn.config()
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')  
        const tokenPayload = jwt.verify(token, process.env.SECRETKEY)
        const user = await User.findOne({ _id: tokenPayload._id, 'tokens.token': token})
        if (!user) {
            throw ('Authentication error...')
        }
        req.token = token
        req.user = user
        next()
        
    } catch (error) {
        console.error(error.message)
        res.status(401).send({
            status: 401,
            error
        })
    }
    
}

export default auth