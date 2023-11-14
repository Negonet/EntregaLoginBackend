import { productsModel } from "../models/products.model.js";

class ProductManager {

    async getProducts(queryObj){
            //const {limit} = queryObj;
    
            try {
                const findProds = await productsModel.find()
                //console.log(findProds);
                return /*limit ? findProds.slice(0, +limit) :*/ findProds
                
            } catch (err) {
                return err
            }}
            
    async addNew(product){
        
        if (product.code > 0) {
            try {
                const createOne = await productsModel.create(product)
                return createOne
            } catch (err) {
                return err 
            }
        }   
    } 
        

    async getProductById(id){
        
        if (id !== '') {
            try {
                const findById = await productsModel.findById(id)
                return findById   
            } catch (err){
                return err
             } 
        }   else {
                console.log('Producto no encontrado')
        }
    }

    async deleteProduct(idd){
        try{
            //console.log(idd)
            const products = await productsModel.findByIdAndDelete(idd)

            // const findId = products.filter((prod) => prod.id === idd)
            //console.log(findId)
            if (products) {
                return products;
            } else {
                return products;
                //console.log('no se encuentra el producto')
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