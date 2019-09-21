const mongoose = require('mongoose')
const validator = require('validator')
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Task from './task'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password should not include string password.')
            }
            if (!validator.isLength(value, 6)) {
                throw new Error('Password should be greater than 6 characters.')
            }
        }

    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be greater than zero')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id}, 'mySecret@123', {expiresIn: '14 days'})    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
    
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()    
    delete userObj.password, delete userObj.tokens, delete userObj.__v 
    return userObj
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email })
    if(!user) {        
        throw ('Invalid credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw ('Invalid credentials')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if(this.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) 
    }
    next()

})

// Delete all user tasks when a user is deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({author: user._id})
    next()
})

const User = mongoose.model('Users', userSchema)

export default User

