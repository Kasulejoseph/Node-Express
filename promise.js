const workPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([12, 23])
        reject('Things ')
        
    }, 2000)
})

workPromise.then((result) => {
    console.log('success', result);
    
}).catch((error) => {
    console.log('Error', error);
    
})