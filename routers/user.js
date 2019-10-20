import express from 'express'
import sharp from 'sharp'
import auth from '../middleware/auth'
import upload from '../middleware/upload'
import Users from '../controllers/user-controller'
const router = express.Router()

router.post('/users', Users.createUser)
router.get('/users/me', auth, Users.getUserProfile)
router.get('/users/:id', Users.getUserByIds)
router.patch('/users/me', auth, Users.updateUserProfile)
router.delete('/users/me', auth, Users.deleteUserProfile)
router.post('/users/login', Users.loginUser)
router.post('/users/logout', auth, Users.logoutUser)
router.post('/users/logoutAll', auth, Users.logoutAllDevices)
router.delete('/users/me/avatar', auth, Users.deleteAvatar)
router.get('/users/:id/avatar', Users.getAvatar)

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({
        message: 'Successfully saved!'
    })
}, (err, _req, res, _next) => {
    res.status(400).send({
        status: 400,
        error: err.message
    })
})
router.all('/users/me/*', (_req, res, next) => {
    res.status(405).send({
        status: 405,
        error: 'Method Not Allowed'
        
    })
    next()
})

export default router