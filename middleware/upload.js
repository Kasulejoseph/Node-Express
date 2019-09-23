import multer from 'multer'

export default multer({
    dest: 'avatars/',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) { 
        if(!file.originalname.match('(png|jpg|jpeg)$', 'i')) {
            return cb(new Error('Only png|jpg|jpeg images allowed'))
        }
        cb(undefined, true)
    }
})