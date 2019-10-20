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

taskSchema.methods.toJSON = function () {
    const task = this
    const taskObj = task.toObject()    
    delete taskObj.__v
    return taskObj
}
const Task = mongoose.model('Tasks', taskSchema)

export default Task