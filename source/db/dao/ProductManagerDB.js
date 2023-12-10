import { productsModel } from "../models/products.model.js";

class ProductManager {

    async getAll(){
        const findAll = await productsModel.find();
        console.log(findAll)
        return findAll
    }
    
    async getProducts(obj){
        const {limit = 10, page = 1} = obj;
        console.log(obj)

    
        const findProds = await productsModel.paginate({}, {limit, page});

        const info = {
            payload: findProds.docs,
            totalPages: findProds.totalPages,
            prevPage: findProds.prevPage,
            nextPage: findProds.nextPage,
            page: findProds.page,
            hasPrevPage: findProds.hasPrevPage,
            hasNextPage: findProds.hasNextPage,
            prevLink: findProds.hasPrevPage ? `http://localhost:8080/api/views?page=${findProds.prevPage}` : null,
            nextLink: findProds.hasNextPage ? `http://localhost:8080/api/views?page=${findProds.nextPage}` : null,

        }   
        //console.log(info);
        return /*limit ? findProds.slice(0, +limit) :*/ {info};
        
    
    }
            
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
            const products = await productsModel.findByIdAndDelete(idd)
            if (products) {
                return products;
            } else {
                return products;

            }

        } catch(err) {
            return err
        }
    }

    async updateProduct (uProd) {
        const id = uProd._id

        try {
            const products = await productsModel.findByIdAndUpdate(id, uProd)
            return products
        } catch (err) {
            return err
        }
    }
}

export const products = new ProductManager();