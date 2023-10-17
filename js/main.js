let products= [];

fetch("./js/products.json")
    .then(Response => Response.json())
    .then(function(data) {
        products = data;
        uploadProducts(products)
    })

//llamo a los elementos de DOM que voy a usar
const productContainer = document.querySelector("#product-container");
const search = document.querySelector(".search")
const filterOptions = document.querySelectorAll(".option")
let btnAdd = document.querySelectorAll(".add")
const counter = document.querySelector("#count")
let detalle = document.querySelectorAll(".detalle")


const uploadProducts = function(allProducts){
    productContainer.innerHTML= "";
    
    allProducts.forEach(productos => { //por cada elemento de array

        const li = document.createElement("li"); //creo el li que va a ser mi contenedor del producto
        li.classList.add("product"); //le doy una clase
        li.innerHTML = ` 
            <h3 class="titulo">${productos.titulo}</h3>
            <img class="imagen" src="./media/${productos.imagen}" alt="${productos.titulo}"
            <p class="precio">$${productos.precio}</p>
            <span class="add" id=${productos.id}><a  href="#">Agregar <i class="fa-solid fa-cart-plus fa-xs"></i></a></span>
            <span class="detalle" id=${productos.id}><a href="../pages/producto.html" target="_blank">Detalles <i class="fa-solid fa-magnifying-glass"></i></a></span>
        `; //le digo todo lo que quiero que contenga linkeando datos del array

        productContainer.append(li);
        
    })
    btnReload();
    btndetail();
};

//uploadProducts(products)

filterOptions.forEach( boton =>{
    boton.addEventListener("click", (e) =>{
    if (e.currentTarget.id != "Reset"){
        const marca = products.filter(productos => productos.categoria.marca === e.currentTarget.id || productos.categoria.ram === e.currentTarget.id || productos.categoria.memoria === e.currentTarget.id)
        uploadProducts(marca);
    }else if(e.currentTarget.id === "Reset"){
            uploadProducts(products);
        }
    })
})
//como mis botones son de una etiqueta "a" con esta funcion evito que se recarge y pierda los datos cada vez que hago click o le aplico algun filtro
function btnReload(){
    const btnAdd = document.querySelectorAll(".add")

    btnAdd.forEach(boton =>{
        boton.addEventListener("click", addCart)
    });
}
let productOnCart;

let productOnCartLS = localStorage.getItem("products-On-Cart");
if(productOnCartLS){
    productOnCart = JSON.parse(productOnCartLS);
    refreshCount();
}else {
    productOnCart = [];
}
 //creo el array del carrito
//const idBtn selecciona el id del boton
//productAdd busca el id del producto dentro del array que coincida con el id del boton
function addCart(e){
    const idBtn = e.currentTarget.id; 
    const productAdd = products.find(product => product.id === idBtn);
    //le digo que busque en el carrito con la propiedad some si existe un producto como el que intento agregar, despues el indico con findIndex que me busque la posicion del id "agregado" en el array y a si hay una coincidencia le agrege 1 a la cantidad 
    if(productOnCart.some(producto => producto.id === idBtn)) {
        const index = productOnCart.findIndex(producto => producto.id === idBtn);
        productOnCart[index].cantidad++;
    } else {
        productAdd.cantidad = 1;
        productOnCart.push(productAdd);
    } 
    refreshCount();

    localStorage.setItem("products-On-Cart", JSON.stringify(productOnCart));
}//guardo en el localStorage la informacion del carrito para que no se pierda y poder usarla en otro html

//le asigno un nuevo elemento al array para contar la cantidad del mismo producto que agrego al carrito
    
// esta funcion me sirbe para llevar la cuenta de la cantidad de productos que tengo en el carrito, entonces le digo con la propiedad reduce que al valor anterior(count) le sume la cantidad del producto(product) y que el numero inicial sea cero.. se la agrego debajo de la funcion addCart para que se valla actualizando cada vez que agrego algun producto
function refreshCount(){ 
    let Number = productOnCart.reduce((count, product) => count + product.cantidad, 0);
counter.innerText = Number;
} 

function btndetail(){
    const detalle = document.querySelectorAll(".detalle")

    detalle.forEach(boton =>{
        boton.addEventListener("click", detalleProducto)
    });
}


const detalleDelProducto = [];
function detalleProducto(e){
    const detalle = e.currentTarget.id;
    const agregarProducto = products.find(producto => producto.id === detalle)

    localStorage.setItem("products-detail", JSON.stringify(agregarProducto));
}