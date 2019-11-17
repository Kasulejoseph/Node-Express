import request from 'supertest'
import app from '../app'
import User from '../models/user'
import {
    userId,
    loggedUser,
    setupDatabase
} from './fixtures/db'

beforeEach(setupDatabase)

test('user should create a account', async () => {
    const response = await request(app).post('/users').send({
        name: 'kasule',
        email: 'kasule@ex.com',
        password: 'Mypass!!!'
    }).expect(201)

    // Assert database changes    
    const user = await User.findById(response.body.data._id)
    expect(user).not.toBeNull()
    // Assert object
    expect(response.body).toMatchObject({
        data: {
            name: 'kasule',
            email: 'kasule@ex.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('12qwert@!')
})

test('User should login sucessfully', async () => {
    const response = await request(app).post('/users/login').send({
        email: loggedUser.email,
        password: loggedUser.password
    }).expect(200)
    const user = await User.findById(response.body.data._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('User should not login with invalid credentions', async () => {
    await request(app).post('/users/login').send({
        email: loggedUser.email,
        password: 'password'
    }).expect(400)
})

test('should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set({
            'Authorization': loggedUser.tokens[0].token
        })
        .send()
        .expect(200)
})

test('should not get profile for unathorized users', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete a user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set({
            'Authorization': loggedUser.tokens[0].token
        })
        .send({})
        .expect(200)
    const user = await User.findById(response.body.data._id)
    expect(user).toBeNull()
})

test('should not delete a user when not authenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
    const user = await User.findById(userId)
    expect(user).not.toBeNull()
})

test('should upload an avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', loggedUser.tokens[0].token)
        .attach('avatar', 'tests/fixtures/slack.png')
        .expect(200)
    const user = await User.findById(userId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', loggedUser.tokens[0].token)
        .send({
            name: 'kasule'
        })
        .expect(200)
    const user = await User.findById(userId)
    expect(user.name).toEqual('kasule')
    expect(response.body.data.name).toBe('kasule')
})

test('should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', loggedUser.tokens[0].token)
        .send({
            location: 'kampala'
        })
        .expect(400)
    expect(response.body['error']).toBe('Invalid Updates Included!!')
})
