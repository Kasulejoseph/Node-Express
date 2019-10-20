import app from './app'
import 'regenerator-runtime/runtime'
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Runing on port ${port}`)
    
})