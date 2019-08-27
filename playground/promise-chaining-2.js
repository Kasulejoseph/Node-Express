import '../src/db/mongoose'

import Task from '../models/task'

// Task.findByIdAndDelete('5d625b572cb945dfffe9f131').then((task) => {
//     console.log(task);
//     return Task.countDocuments({complete: false})
// }).then((result) => {
//     console.log(result);
    
// }).catch((e) => {
//     console.log(e);
    
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    console.log('taske', task);
    
    const count = await Task.countDocuments({complete: false})
    return count
}

deleteTaskAndCount('5d641454902d0049e3c5c240').then((count) => {
    console.log('count', count);
    
}).catch((e) => {
    console.log('e', e);
    
})
