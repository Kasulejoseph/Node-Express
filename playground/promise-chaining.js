import '../src/db/mongoose'

import User from '../models/user'

User.findByIdAndUpdate('5d619a20a640a0d8438e96b9', {
    age: 20
}).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 20})
    
}).then((result) => {
    console.log(result);
    
}).catch((e) => {
    console.log(e);
    
})