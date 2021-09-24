const mongoose = require('mongoose')
import dotenv from 'dotenv'

dotenv.config()



let db_url = process.env.NODE_ENV === 'production'? process.env.MONGODB_URL : process.env.LOCAL_URL

if(process.env.NODE_ENV === 'testing'){
    db_url = 'mongodb://kasule:casjos06@cluster0-shard-00-00-zj21u.mongodb.net:27017,cluster0-shard-00-01-zj21u.mongodb.net:27017,cluster0-shard-00-02-zj21u.mongodb.net:27017/task-manager-api-test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
}

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'task-manager-api-test'
})
    .catch(error => console.log(error))
