const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('Users', {
    name: {type: String},
    age: {type: Number}
})

const newUser = new User({
    name: 'kasule',
    age: 'dgjdrn'
})

// newUser.save().then((result) => {
//     console.log(result);
    
// }).catch((error) => {
//     console.log(error);
    
// })

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

newTask.save().then((result) => {
    console.log(result);
    
}).catch((error) => {
    console.log('error', error);
    
})