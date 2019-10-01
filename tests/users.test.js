import request from 'supertest'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import app from '../app'
import User from '../models/user'
import dotenv from 'dotenv'
const userId = mongoose.Types.ObjectId()

dotenv.config()
const loggedUser = {
    _id: userId,
    email: 'joseph@g.com',
    name: 'joseph',
    password: '12qwert@!',
    tokens: [{
        token: jwt.sign({_id: userId}, process.env.SECRETKEY)
    }]
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(loggedUser).save()

})
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

test('User should login sucessfully', async() => {
    const response = await request(app).post('/users/login').send({
        email: loggedUser.email,
        password: loggedUser.password
    }).expect(200)
    const user = await User.findById(response.body.data._id)    
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('User should not login with invalid credentions', async() => {
    await request(app).post('/users/login').send({
        email: loggedUser.email,
        password: 'password'
    }).expect(400)
})

test('should get user profile', async() => {
    await request(app)
        .get('/users/me')
        .set({'Authorization': loggedUser.tokens[0].token})
        .send()
        .expect(200)
})

test('should not get profile for unathorized users', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete a user', async() => {
    const response = await request(app)
        .delete('/users/me')
        .set({'Authorization': loggedUser.tokens[0].token})
        .send({})
        .expect(200)
        const user = await User.findById(response.body.data._id)    
        expect(user).toBeNull()
})

test('should not delete a user when not authenticated', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
    const user = await User.findById(userId)    
    expect(user).not.toBeNull()
})
