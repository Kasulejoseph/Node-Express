import request from 'supertest'
import Task from '../models/task'
import app from '../app'

import {userId, loggedUser, loggedUser2, taskOne, setupDatabase} from './fixtures/db'

beforeEach(setupDatabase)

test('should create task for user', async() => {
    const response = await request(app)
        .post('/task')
        .set({'Authorization': loggedUser.tokens[0].token})
        .send({
            desc: 'Test is testing you'
        })
        .expect(201)
    const task = await Task.findById(response.body.data._id)    
    expect(task.complete).toEqual(false)
})

test('should get all tasks for a single user', async() => {
    const response = await request(app)
        .get('/task')
        .set({'Authorization': loggedUser.tokens[0].token})
        .send()
        .expect(200)

    expect(response.body.task_count).toEqual(2)
})

test('should not delete tasks which they doesnt below to them', async() => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set({'Authorization': loggedUser2.tokens[0].token})
        .send()
        .expect(401)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})