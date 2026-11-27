const productos = [
    { nombre: "Origen Huila 500 g", precio: 42000 },
    { nombre: "Origen Nariño 250 g", precio: 26000 },
    { nombre: "Prensa francesa", precio: 95000 },
    { nombre: "Origen Sierra 500 g", precio: 45000 },
    { nombre: "Molino manual", precio: 120000 }
];

const ciudades = [
    "Medellín",
    "Bogotá",
    "Cali",
    "Pereira"
];


// Generar un entero aleatorio dentro de un rango
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Generar historial de ventas
function generarVentas(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("n debe ser un entero no negativo");
    }

    const ventas = [];
    const maxClientes = Math.max(1, Math.floor(n / 3));

    for (let i = 0; i < n; i++) {

        const producto = productos[
            aleatorio(0, productos.length - 1)
        ];

        const ciudad = ciudades[
            aleatorio(0, ciudades.length - 1)
        ];

        const dia = String(aleatorio(1, 30))
            .padStart(2, "0");

        ventas.push({
            id: i + 1,
            fecha: `2026-09-${dia}`,
            cliente: `C${aleatorio(1, maxClientes)}`,
            producto: producto.nombre,
            ciudad: ciudad,
            cantidad: aleatorio(1, 5),
            precio: producto.precio
        });
    }

    return ventas;
}

module.exports = generarVentas;