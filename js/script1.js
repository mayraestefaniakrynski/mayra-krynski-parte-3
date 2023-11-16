//variables
const carrito = document.querySelector ('#carrito');
const listaTortas = document.querySelector ('#lista-tortas');
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector ('#vaciar-carrito');
let articulosCarrito = []

cargarEventListeners ();

function cargarEventListeners () {
// cuando presionamos "agregar carrito"
listaTortas.addEventListener ('click', agregarTortas);

//cuando se elimina una torta del carrito
carrito.addEventListener ('click', eliminarTortas)

//Al vaciar carrito
vaciarCarritoBtn.addEventListener ('click', vaciarCarrito);

//Documento cargado
document.addEventListener ('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse (localStorage.getItem ('carrito')) || []  ;
    carritoHTML();
})
}

// Función que añade la torta al carrito
function agregarTortas(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const tortas = e.target.parentElement.parentElement;
        // Enviamos la torta seleccionada para tomar sus datos
        leerDatosTortas(tortas);
     }
}
// Lee los datos de la torta seleccionada
function leerDatosTortas (tortas){
    const infoTortas = {
        imagen: tortas.querySelector('img').src,
        titulo: tortas.querySelector('h4').textContent,
        precio: tortas.querySelector('.precio span').textContent,
        id: tortas.querySelector('a').getAttribute('data-id'), 
        cantidad: 1
   }
   if( articulosCarrito.some( tortas => tortas.id === infoTortas.id ) ) { 
    const tortas = articulosCarrito.map( tortas => {
        if( tortas.id === infoTortas.id ) {
             let cantidad = parseInt(tortas.cantidad);
             cantidad++
             tortas.cantidad =  cantidad;
             return tortas;
        } else {
             return tortas;
        }
   })
   articulosCarrito = [...tortas];
}  else {
   articulosCarrito = [...articulosCarrito, infoTortas];
}

console.log(articulosCarrito)
carritoHTML();
}

// Elimina las tortas del carrito en el DOM
function eliminarTortas(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-tortas') ) {

         const tortas= e.target.parentElement.parentElement;
         const tortasId = tortas.querySelector('a').getAttribute('data-id');
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(tortas => tortas.id !== tortasId);

         carritoHTML();
    }
}


// Muestra las tortas seleccionadas en el Carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(tortas => {
     const {imagen, titulo, cantidad, precio, Id} = tortas
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${imagen}" width=100>
              </td>
              <td>${titulo}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>
                   <a href="#" class = "borrar-torta" data-id="${tortas.id}"> X </a>
              </td>
        `;
         contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina las tortas del carrito en el DOM
function vaciarCarrito() {
    
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
