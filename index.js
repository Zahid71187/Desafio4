const express =  require('express')

const app = express()
const router  = require('./routes')
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/formulario', express.static(__dirname + '/public'))
app.use('/api/productos', router)

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})

app.on('error', (err) => console.log('Error: ', err))
