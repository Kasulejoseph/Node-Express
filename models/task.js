const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    complete: {
        type: Boolean,
        default: false,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {timestamps : true})

const Task = mongoose.model('Tasks', taskSchema)

export default Task