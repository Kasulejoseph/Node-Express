
// const workPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([12, 23])
//         reject('Things ')
        
//     }, 2000)
// })

// workPromise.then((result) => {
//     console.log('success', result);
    
// }).catch((error) => {
//     console.log('Error', error);
    
// })

const sum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)

    })
}
// sum(3, 5).then((result) => {
//     console.log(result);
    
//     sum(result, 10).then((result2) => {
//         console.log('--->', result2);
        
//     }).catch((e) => {
//         console.log(e);
        
//     })

    
// }).catch((error) => {
    
//     console.log(error);
    
// })

/* Promise chaining*/

sum(1, 2).then((result) => {
    console.log(result);
    return sum(result, 10)
    
}).then((result2) => {
    console.log(result2);
    return sum(result2, 10)

}).then((result3) => {
    console.log(result3);
}).catch((e) => {
    console.log(e); 
})


