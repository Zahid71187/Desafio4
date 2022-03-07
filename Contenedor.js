const fs = require('fs')
 class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    async save(producto){
        try {
            let productos
            // valida que el archivo existe o en su caso debe crearlo
            const archivos = await fs.promises.readdir('./')
            if(!archivos.includes(this.archivo)){
                await fs.promises.writeFile(`./${this.archivo}`, '[]')
            }
            // lee los datos del archivo
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            
            if(datos !== '') {
                productos = JSON.parse(datos)
            } 
            else{
                productos = []
            }
            
            if(productos.length !== 0){
                let id
                productos.forEach( product => {
                    id = product.id
                })
                id++
                producto.id = id
            } else{
                producto.id = 1
            }
            productos.push(producto)
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(productos))
            console.log('Producto guardado')
            return producto.id
        }
        catch(e) {
            return 'Se produjo un error: ' + e
        }
    }

    async getById(id){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            const producto = datos.filter( productos => parseInt(productos.id) === parseInt(id))
            if(producto.length === 0) return null
            return producto[0]
        }
        catch(e){
           return 'Ocurrio un error en la busqueda: ', e
        }
    }

    async getAll(){
        try{
            let productos
            const datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if( datos === '') return null
            productos = JSON.parse(datos)
            if(productos.length === 0) return null

            return productos
        }
        catch(e){
            return 'Ocurrió un error: ' + e
        }
    }

    async updateById(id, productoUpdate){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            console.log(datos)
            let productos = datos.filter( producto => parseInt(producto.id) === parseInt(id) )
            
            if(productos.length ===0 ){
                console.log(`El producto con id ${id} no existe`)
                return `El producto con id ${id} no existe`
            }

            productos = datos.map( producto => {
                if(parseInt(producto.id) === parseInt(id)){
                    producto.title = productoUpdate.title
                    producto.price = productoUpdate.price
                    producto.thumbnail = productoUpdate.thumbnail
                }

                return producto
            })

            console.log(productos)
             await fs.promises.writeFile(`./${this.archivo}` , JSON.stringify(productos))
            console.log('Producto actualizado')

            return 'Producto actualizado'
        }
        catch(e){
           return 'Ocurrio un error en la actualización: ', e
        }
    }

    async deleteById(id){
        try{
            let datos = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
            if(datos === '') return null
            datos = JSON.parse(datos)
            let productos = datos.filter( productos => parseInt(productos.id) === parseInt(id))
            
            if(productos.length ===0 ){
                console.log(`El producto con id ${id} no existe`)
                return `El producto con id ${id} no existe`
            }

            productos = datos.filter( productos => parseInt(productos.id) !== parseInt(id))
            await fs.promises.writeFile(`./${this.archivo}` , JSON.stringify(productos))
            console.log('Producto eliminado')
            return 'Producto eliminado'
        }
        catch(e){
           return 'Ocurrio un error en la eliminación: ', e
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(`./${this.archivo}` , '[]')
            console.log('Productos eliminados')
        }
        catch(e){
           return 'Ocurrió un error: ', e
        }
    }

}

module.exports = Contenedor
