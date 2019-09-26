const mongoose = require('mongoose')
import dotenv from 'dotenv'

dotenv.config()


// console.log(process.env);
const db_url = process.env.NODE_ENV === 'production'? process.env.MONGODB_URL : process.env.LOCAL_URL

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'task-manager-api'
})
    .catch(error => console.log(error))