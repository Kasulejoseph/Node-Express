  
import express from 'express'
import auth from '../middleware/auth'
import Tasks from '../controllers/task-controller'
const router = express.Router()

router.post('/task', auth, Tasks.createTask)
router.get('/task', auth, Tasks.readTask)
// feature has a bug
router.get('/task/:id', auth, Tasks.readSingleTask)
router.patch('/tasks/:id', auth, Tasks.updateTask)
router.delete('/tasks/:id', auth, Tasks.deleteTask)

export default router