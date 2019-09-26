import express from 'express'
import 'regenerator-runtime/runtime'
import './src/db/mongoose'
import userRouter from './routers/user'
import taskRouter from './routers/task'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use([userRouter, taskRouter])

app.get('/', async (req, res) => {
    res.status(200).send({
        status: 200,
        data: 'Welcome!!!'
    })
})
app.listen(port, () => {
    console.log(`Runing on port ${port}`)
    
})