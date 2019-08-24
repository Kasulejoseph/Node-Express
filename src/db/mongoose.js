const mongoose = require('mongoose')
const validator = require('validator')
const connection = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('Users', {
    name: {
        type: String,
        trim: true
    },
    
    email: {
        type: String,
        require: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be greater than zero')
            }
        }
    }
})

const newUser = new User({
    name: 'ka   sule',
    email: 'kasule08joseph@gmail.com',
    age: 50
})

newUser.save().then((result) => {
    console.log(result);
    
}).catch((error) => {
    console.log(error);
    
})

const task = mongoose.model('Tasks', {
    desc: {
        type: String
    },
    complete: {
        type: Boolean
    }
})

const newTask = new task({
    desc: 'Hello world',
    complete: true
})

// newTask.save().then((result) => {
//     console.log(result);
    
// }).catch((error) => {
//     console.log('error', error);
    
// })