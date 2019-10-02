import app from './app'

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Runing on port ${port}`)
    
})