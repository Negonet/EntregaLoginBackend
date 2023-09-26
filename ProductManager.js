import fs from 'fs'

const path = 'ProductList.txt'

class ProductManager {

    async getProducts(){

        try {
            if (fs.existsSync(path)) {
                const productFile = await fs.promises.readFile(path, 'utf-8')
                console.log(JSON.parse(productFile))
                return JSON.parse(productFile)
                
            } else {
                return []
            }
        } catch (err) {
            return err
        }    
    }
        
    async addNew(title,description,price,thumbnail,code,stock){
        try {
            const product = await this.getProducts()
            let id
            if (!product.length){
                id=1
            } else {
                id=product[product.length-1].id+1
            }
                const addProduct = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
            
            const find = product.find(product => product.code === code) 
               
            if (find) {
                console.log('producto ya ingresado')
            } else {
                addProduct.id = id
                product.push(addProduct)
                console.log(addProduct)
                await fs.promises.writeFile(path, JSON.stringify(product))
            }
        }

         catch (err) {
            return err
            
        }}
    async getProductById(id){
        try {
            const product = await this.getProducts()
            const find = product.find(product => product.id === id)
        
            if (find) {
                return find   
            } else {
            console.log('Not Found')
            }

        } catch (err){
            return err
        }}

    async deleteProduct(id){
        try{
            const products = await this.getProducts()
            const newProducts = products.filter(prod => prod.id!==id)
            await fs.promises.writeFile(path,JSON.stringify(newProducts))
            return newProducts

        } catch(err) {
            return err
        }
    }
}



async function productinf () {
    const product = new ProductManager()
    //await product.addNew('Taza','blanca',40,'tazablanca',3,3)
    //await product.addNew('Plato','gris',50,'platogris',5,5)
    //await product.addNew('Tenedor','inox',30,'tenedorinox',4,3)
    //await product.deleteProduct(3)
    //await product.getProductById(1)
    //await product.getProducts()
    
}

productinf()

export const products = new ProductManager();