import express from 'express'
import './src/db/mongoose'
import userRouter from './routers/user'
import taskRouter from './routers/task'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use([userRouter, taskRouter])

app.listen(port, () => {
    console.log(`Runing on port ${port}`);
    
})