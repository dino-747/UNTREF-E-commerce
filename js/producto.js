//localStorage.setItem("products-detail", JSON.stringify(detalleDelProducto));
const detalleDelProducto = JSON.parse(localStorage.getItem("products-detail"))

const cargarProductosDetalle = document.querySelector(".container-Producto-Detalle")
let btnAgregar = document.querySelector(".agregar-Producto")

function cargarProducto(){
    if(detalleDelProducto){

        cargarProductosDetalle.innerHTML=`
            <div class="card-Producto">
                <span>
                    <img class="product-Detalle-Img" src="../media/${detalleDelProducto.imagen}" alt="">
                </span>
            </div>
            <ul class="descripcion-Producto">
            <div
                <li class="titulo">
                    <h3>${detalleDelProducto.titulo}</h3>
                </li>
            </div>
                <li class="detalles">
                    <span>Marca: ${detalleDelProducto.categoria.marca}</span>
                </li>    
                <li class="detalles">
                    <span>Modelo: ${detalleDelProducto.titulo}</span>
                </li>    
                <li class="detalles">
                    <span>Ram: ${detalleDelProducto.categoria.ram}</span>
                </li> 
                <li class="detalles">
                    <span>Memoria: ${detalleDelProducto.categoria.memoria}</span>
                </li>
                <li class="precio">
                    <span>Precio: $${detalleDelProducto.precio}</span>
                </li>
            </ul>
            `
    }
}

cargarProducto();


