const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('Users', {
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
    }
})


export default User

