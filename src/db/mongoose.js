const mongoose = require('mongoose')
import dotenv from 'dotenv'

dotenv.config()



let db_url = process.env.NODE_ENV === 'production'? process.env.MONGODB_URL : process.env.LOCAL_URL

if(process.env.NODE_ENV === 'testing'){
    db_url = process.env.TEST_URL
}

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'task-manager-api-test'
})
    .catch(error => console.log(error))