import request from 'supertest'
import app from '../app'

test('user should create a account', async () => {
    await request(app).post('/users').send({
        name: 'kasule', 
        email: 'kasule@ex.com',
        password: 'Mypass!!!'
    }).expect(201)
})