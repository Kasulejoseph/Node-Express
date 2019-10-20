import express from 'express'
import './src/db/mongoose'
import userRouter from './routers/user'
import taskRouter from './routers/task'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.use([userRouter, taskRouter])

app.get('/', async (req, res) => {
    res.status(200).send({
        status: 200,
        data: 'Welcome!!!'
    })
})

export default app