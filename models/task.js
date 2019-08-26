const mongoose = require('mongoose')

const Task = mongoose.model('Tasks', {
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

export default Task