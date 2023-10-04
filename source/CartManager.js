import fs from 'fs'

const path = 'carrito.json'

class CartManager {
    
    async getCart(){
        try {
            const cart = await fs.promises.readFile(path, 'utf-8');
            const cartReaded = JSON.parse(cart)
            return cartReaded
        } catch (err) {
            return err
        }

    }

    
    async createCart(newCart){
        try {
            console.log(newCart)
            const readProd = await this.getCart({})
            let id
            if (!readProd.length){
                id=1
            } else {
                id=readProd[readProd.length-1].id+1
            }
            const create = {...newCart,id}
            const found = readProd.find((item) => 
                 item.id === create.id) 
                if (!found) {
                    readProd.push(create)
                    await fs.promises.writeFile(path, JSON.stringify(readProd))
                    return readProd
                } else {
                    
                    console.log('Carrito ya creado')
                }
        } catch (err) {
            return err 
        }}

}

export const carrito = new CartManager();