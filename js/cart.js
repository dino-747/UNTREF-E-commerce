const productOnCart = JSON.parse(localStorage.getItem("products-On-Cart"))

const carritoVacio = document.querySelector("#Carrito-vacio");
const productsContainer = document.querySelector("#cart-products");
const cartActions = document.querySelector("#cart-action");
const comprado = document.querySelector(".Producto-comprado");
let btnDelete = document.querySelectorAll(".cart-Product-Delete")
const btnVaciar = document.querySelector("#cart-action-vaciar")
const precioTotal = document.querySelector("#Total")
const comprarProducto = document.querySelector(".cart-action-buy")

function cargarProductosCarrito(){
if (productOnCart && productOnCart.length > 0){
    
    carritoVacio.classList.add("disabled");
    productsContainer.classList.remove("disabled");
    cartActions.classList.remove("disabled");
    comprado.classList.add("disabled")

    productsContainer.innerHTML = "";

    productOnCart.forEach(product =>{

        const li = document.createElement("li");
        li.classList.add("cart-Product");
        li.innerHTML = `
            <li>
                <img class="cart-Product-img" src= "../media/${product.imagen}" alt="${product.titulo}">
            </li>
            <li class="cart-Product-title">
                <span>Titulo</span>
                <h3>${product.titulo}</h3>
            </li>
            <li class="cart-Product-Cantidad">
                <span>Cantidad</span>
                <p>${product.cantidad}</p>
            </li>
            <li
            class="cart-Product-Precio">
                <span>Precio</span>
                <p>$${product.precio}</p>
            </li>
            <li class="cart-Product-Subtotal">
                <span>Subtotal</span>
                <p>$${product.precio * product.cantidad}</p>
            </li>
            <li>
                <span >
                    <a href="#" id="${product.id}" class="cart-Product-Delete"><i class="fa-solid fa-trash"></i></a>
                </span>
            </li> `;

    productsContainer.append(li)
    })
    btnDeleteReload()
    actualizarTotal()

}else {
    carritoVacio.classList.remove("disabled");
    productsContainer.classList.add("disabled");
    cartActions.classList.add("disabled");
    comprado.classList.add("disabled");
}
    
}
cargarProductosCarrito()

function btnDeleteReload(){
    btnDelete = document.querySelectorAll(".cart-Product-Delete")

    btnDelete.forEach(boton =>{
        boton.addEventListener("click", deleteProduct)
    });
}

function deleteProduct(e){
    const idBtn = e.currentTarget.id;
    const index = productOnCart.findIndex(producto => producto.id === idBtn);
    productOnCart.splice(index, 1);
    cargarProductosCarrito();
    btnDeleteReload()
    
    localStorage.setItem("products-On-Cart", JSON.stringify(productOnCart));
}

btnVaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito(){
    productOnCart.length = 0;
    localStorage.setItem("products-On-Cart", JSON.stringify(productOnCart));
    cargarProductosCarrito();
}

function actualizarTotal(){
    const calcularTotal = productOnCart.reduce((count, producto) => count + (producto.precio * producto.cantidad), 0);
    Total.innerText =`$${calcularTotal}`;
}

comprarProducto.addEventListener("click", comprarTodo);
function comprarTodo(){

    productOnCart.length = 0;
    localStorage.setItem("products-On-Cart", JSON.stringify(productOnCart));

    carritoVacio.classList.add("disabled");
    productsContainer.classList.add("disabled");
    cartActions.classList.add("disabled");
    comprado.classList.remove("disabled");

}