import '../src/db/mongoose'

import User from '../models/user'

// User.findByIdAndUpdate('5d619a20a640a0d8438e96b9', {
//     age: 20
// }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 20})
    
// }).then((result) => {
//     console.log(result);
    
// }).catch((e) => {
//     console.log(e);
    
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age  })
    return count
}

updateAgeAndCount('5d6259a88d0681de86918bfe', 30).then((count) => {
    console.log('count', count);
    
}).catch((e) => {
    console.log(e);
    
})