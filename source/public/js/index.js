const socketClient =  io();

socketClient.on('welcome', (message) => {
    alert(message)
});

const form = document.getElementById('form');
const title = document.getElementById('title');
const showList = document.getElementById('productList');


form.onsubmit = (e) => {
    e.preventDefault();
    const prod = {

        title : form.title.value,
        description : form.description.value,
        price : form.price.value,
        thumbnail : form.title.value + form.description.value,
        code : form.code.value,
        stock : form.stock.value,
        category : form.category.value,

    }
    socketClient.emit('newProduct', prod);
    
};

socketClient.on('addNew', (newProdList) =>{

    const products = newProdList.map((p) => {
            return `<h4>Nombre del Producto : ${p.title}</h4>
                    <h4>Detalle : ${p.description}</h4>
                    <h4>Precio : $ ${p.price}</h4>
                    <h4>Thumbnail : ${p.thumbnail}</h4>
                    <h4>Codigo : ${p.code}</h4>
                    <h4>Stock : ${p.stock}</h4>
                    <h4>Categoria : ${p.category}</h4>
                    <h4>Id : ${p._id}</h4>
                    <hr>`;
        }).join(" ");

    //console.log(newProdList)
    showList.innerHTML = products;
});
