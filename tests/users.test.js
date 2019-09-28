import request from 'supertest'
import app from '../app'
import User from '../models/user'

const loggedUser = {
    email: 'joseph@g.com',
    name: 'joseph',
    password: '12qwert@!'
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(loggedUser).save()

})
test('user should create a account', async () => {
    await request(app).post('/users').send({
        name: 'kasule', 
        email: 'kasule@ex.com',
        password: 'Mypass!!!'
    }).expect(201)
})

test('User should login sucessfully', async() => {
    await request(app).post('/users/login').send({
        email: loggedUser.email,
        password: loggedUser.password
    }).expect(200)
})

test('User should not login with invalid credentions', async() => {
    await request(app).post('/users/login').send({
        email: loggedUser.email,
        password: 'password'
    }).expect(400)
})
