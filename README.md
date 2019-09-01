# Node-Class

start mongodb locally -> `/Users/kasule/mongodb/bin/mongod --dbpath=/Users/kasule/mongodb-data/`

node src/db/mongoose.js

prod: `https://task-app.kasule06joseph.now.sh `

Add mongoose_url: `now secrets add mongoose_url  mongodb://kasule:<password>@cluster0-shard-00-00-zj21u.mongodb.net:27017,cluster0-shard-00-01-zj21u.mongodb.net:27017,cluster0-shard-00-02-zj21u.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`