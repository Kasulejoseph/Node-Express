import jwt from 'jsonwebtoken'
import User from '../models/user'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')  
        const tokenPayload = jwt.verify(token, 'mySecret@123')
        const user = await User.findOne({ _id: tokenPayload._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
        
    } catch (error) {
        res.status(401).send({
            status: 401,
            error
        })
    }
    
}

export default auth