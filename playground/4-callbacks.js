// async callback
setTimeout(() => {
    console.log('2 seconds are up...')
}, 2000)


const names = ['joseph', 'kigali', 'moses', 'Emmanuel']
// sync callback
const lastName = names.filter((name) => {
    return name.length
})

const geoLocation = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitute: 0
        }
        callback(data)
    }, 2000)
}

geoLocation('kansanga', (data) => {
    console.log(data)
})
