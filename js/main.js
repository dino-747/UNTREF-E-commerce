let products= [];

fetch("./js/products.json")
    .then(Response => Response.json())
    .then(function(data) {
        products = data;
        uploadProducts(products)
    })

const productContainer = document.querySelector("#product-container");
const search = document.querySelector(".search")
const filterOptions = document.querySelectorAll(".option")
let btnAdd = document.querySelectorAll(".add")
const counter = document.querySelector("#count")
let detalle = document.querySelectorAll(".detalle")


const uploadProducts = function(allProducts){
    productContainer.innerHTML= "";
    
    allProducts.forEach(productos => { 

        const li = document.createElement("li"); 
        li.classList.add("product"); 
        li.innerHTML = ` 
            <h3 class="titulo">${productos.titulo}</h3>
            <img class="imagen" src="./media/${productos.imagen}" alt="${productos.titulo}"
            <p class="precio">$${productos.precio}</p>
            <span class="add" id=${productos.id}><a  href="#">Agregar <i class="fa-solid fa-cart-plus fa-xs"></i></a></span>
            <span class="detalle" id=${productos.id}><a href="../pages/producto.html" target="_blank">Detalles <i class="fa-solid fa-magnifying-glass"></i></a></span>
        `; 

        productContainer.append(li);
        
    })
    btnReload();
    btndetail();
};



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

function addCart(e){
    const idBtn = e.currentTarget.id; 
    const productAdd = products.find(product => product.id === idBtn);
    
    if(productOnCart.some(producto => producto.id === idBtn)) {
        const index = productOnCart.findIndex(producto => producto.id === idBtn);
        productOnCart[index].cantidad++;
    } else {
        productAdd.cantidad = 1;
        productOnCart.push(productAdd);
    } 
    refreshCount();

    localStorage.setItem("products-On-Cart", JSON.stringify(productOnCart));
}

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