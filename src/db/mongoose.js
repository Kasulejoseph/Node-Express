const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

const newUser = new User({
    name: 'KASUKE',
    email: 'kasule08joseph@gmail.com',
    password: 'passwo',
    age: 50
})

// newUser.save().then((result) => {
//     console.log(result);

// }).catch((error) => {
//     console.log(error);

// })

const task = mongoose.model('Tasks', {
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    complete: {
        type: Boolean,
        default: false,
        required: false
    }
})

const newTask = new task({
    desc: 'Hello uganda',
})

newTask.save().then((result) => {
    console.log(result);

}).catch((error) => {
    console.log('error', error);

})