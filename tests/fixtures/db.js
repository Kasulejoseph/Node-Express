import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../../models/user'
import Task from '../../models/task'
import dotenv from 'dotenv'
const userId = new mongoose.Types.ObjectId()
const userId2 = new mongoose.Types.ObjectId()

dotenv.config()

const loggedUser = {
    _id: userId,
    email: 'joseph@g.com',
    name: 'joseph',
    password: '12qwert@!',
    tokens: [{
        token: jwt.sign({
            _id: userId
        }, process.env.SECRETKEY)
    }]
}

const loggedUser2 = {
    _id: userId2,
    email: 'kasule@g.com',
    name: 'kasule',
    password: '12trewq@!',
    tokens: [{
        token: jwt.sign({
            _id: userId2
        }, process.env.SECRETKEY)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    desc: 'First test word',
    complete: false,
    author: loggedUser._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    desc: 'Second test work',
    complete: true,
    author: loggedUser._id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    desc: 'Third test work',
    complete: true,
    author: loggedUser2._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(loggedUser).save()
    await new Task(task3).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
}

export {
    userId,
    loggedUser,
    loggedUser2,
    taskOne,
    setupDatabase
}