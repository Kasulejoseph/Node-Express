import '../src/db/mongoose'

import Task from '../models/task'

Task.findByIdAndDelete('5d625b572cb945dfffe9f131').then((task) => {
    console.log(task);
    return Task.countDocuments({complete: false})
}).then((result) => {
    console.log(result);
    
}).catch((e) => {
    console.log(e);
    
})