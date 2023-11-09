import { productsModel } from "../models/products.model.js";

const path = 'productos.json'

class ProductManager {

    async getProducts(queryObj){
            const {limit} = queryObj;
    
            try {
                const findProds = await productsModel.find()
                return limit ? findProds.slice(0, +limit) : findProds

            } catch (err) {
                return err
            }}
            
    async addNew(product){
        try {
            const createOne = await productsModel.create(product)
            return createOne
        } catch (err) {
            return err 
        }}

    async getProductById(id){
        try {
            const products = await this.getProducts({})
            const found = products.find((product) => product.id === id)
            if (found) {
                return found   
            } else {
            console.log('Producto no encontrado')
            }

        } catch (err){
            return err
        }}

    async deleteProduct(idd){
        try{
            console.log(idd)
            const products = await this.getProducts({})
            const findId = products.filter((prod) => prod.id === idd)
            console.log(findId)
            if (findId) {
                const neWProdArr = products.filter((prod) => prod.id !== idd)
                await fs.promises.writeFile(path,JSON.stringify(neWProdArr))
            } else {
                console.log('no se encuentra el producto')
            }

        } catch(err) {
            return err
        }
    }

    async updateProduct (prod) {
        try {
            const products = await this.getProducts({})
            const updated = products.findIndex((product) => product.id === prod.id)
            console.log(updated)
            if ( updated >= 0 ) {
                products[updated] = prod;
                await fs.promises.writeFile(path ,JSON.stringify(products))
                console.log(prod)
            } 
                else{
                console.log('no se encuentra el producto')
            }
        } catch (err) {
            return err
        }
    }
}





export const products = new ProductManager();