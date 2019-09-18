import { MongoClient, ObjectID} from 'mongodb'
const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database') 
    }
    const db = client.db(dbName)
    console.log('Connected successfully...')
    // update one
    db.collection('users').updateOne({
        _id: new ObjectID('5d456d618f70f25a2315b1c9')
    }, {
        $set: {
            name: 'Joseph'
        }
    }).then((results) => {
        console.log(results)
        
    }).catch((error) => {
        console.log(error)
        
    })

    //Update many
    db.collection('users').updateMany({
        name: 'benedicte'
    }, {
        $inc: {
            age: 2
        }
    }).then((results) => {
        console.log(results)
        
    }).catch((error) => {
        console.log(error)
        
    })

    //Delete field
    db.collection('users').deleteMany({
        age: 26
    }).then((result) => {
        console.log(result)
        
    }).catch((error) => {
        console.log(error)
        
    })

    

})

