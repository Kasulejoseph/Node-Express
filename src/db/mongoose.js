const mongoose = require('mongoose')
import dotenv from 'dotenv'

dotenv.config()


// console.log(process.env);
const db_url = process.env.NODE_ENV === 'production'? 
    'mongodb://kasule:casjos06@cluster0-shard-00-00-zj21u.mongodb.net:27017,cluster0-shard-00-01-zj21u.mongodb.net:27017,cluster0-shard-00-02-zj21u.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' : process.env.LOCAL_URL
// console.log('dfjvdnfiv', db_url)

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'task-manager-api'
})
    .catch(error => console.log(error))