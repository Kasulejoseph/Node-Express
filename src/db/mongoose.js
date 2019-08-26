const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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