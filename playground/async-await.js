
const sum = (a, b) => {
    return new Promise((resolve, reject) => {
        if(a<0 || b< 0) {
            return reject('Numbers must be positive integers')
        }
        setTimeout(() => {
            resolve(a + b)
        }, 2000)

    })
}

const doWork = async () => {
    const add = await sum(1, 9)
    const add2 = await sum(add, 10)
    const add3 = await sum(add2, -1)
    return add3

}
doWork().then((result) => {
    console.log(result);
    
}).catch((e) => {
    console.log(e);
    
})
