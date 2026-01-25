// Arreglo de productos
const productos = [
    {
        nombre: "Laptop",
        precio: 850,
        descripcion: "Laptop para trabajo y estudio"
    },
    {
        nombre: "Mouse",
        precio: 20,
        descripcion: "Mouse inalámbrico"
    },
    {
        nombre: "Teclado",
        precio: 35,
        descripcion: "Teclado mecánico"
    }
];

// Referencia al <ul>
const lista = document.getElementById("lista-productos");
const btnAgregar = document.getElementById("btnAgregar");

// Función para renderizar productos
function renderizarProductos() {
    lista.innerHTML = "";

    productos.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${producto.nombre}</strong><br>
            Precio: $${producto.precio}<br>
            ${producto.descripcion}
        `;
        lista.appendChild(li);
    });
}

// Evento para agregar un nuevo producto
btnAgregar.addEventListener("click", () => {
    const nuevoProducto = {
        nombre: "Producto nuevo",
        precio: 10,
        descripcion: "Descripción del nuevo producto"
    };

    productos.push(nuevoProducto);
    renderizarProductos();
});

// Renderizar automáticamente al cargar la página
renderizarProductos();
