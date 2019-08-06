const { MongoClient, ObjectID} = require('mongodb')
const id = new ObjectID()
console.log('dhvjdfvd', id.id.length);
console.log('dhvjdfvd', id.toHexString().length);

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');  
    }
    const db = client.db(dbName)
    console.log('Connected successfully...');

    // db.collection('users').insertOne({
    //     name: 'kasule joe',
    //     age: 24
    // }, (error, result) => {
    //     if(error){
    //         return console.log(error.message);   
    //     }
    //     console.log(result.ops);
        
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'jane',
    //         age: 23
    //     }, {
    //         name: 'benedicte',
    //         age: 24
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log(error.message);
    //     }
    //     console.log(result.ops);
        
    // })

    //query objects
    db.collection('users').findOne({_id: new ObjectID('5d456d618f70f25a2315b1c9')}, (error, user) => {
        if(error) {
            return console.log(error.message);
            
        }
        console.log(user);
        
    })

    db.collection('users').find({name: 'jane'}).toArray((error, users) => {
        if(error) {
            return console.log(error.message);
            
        }
        console.log(users);
        
    })
    

})

