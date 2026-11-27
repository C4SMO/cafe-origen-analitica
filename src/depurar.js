
const ventas = require("./datos.js");

const {
    valorVenta,
    totalPorCiudad,
    ventasDelDia,
    ticketPromedio,
    totalVendido
} = require("./analitica.js");


// ERROR 1: Ciudades duplicadas

console.log("\n--- DEPURACIÓN 1: CIUDADES DUPLICADAS ---");

const datosPrueba = [
    {
        ciudad: "Bogotá",
        cantidad: 1,
        precio: 26000
    },
    {
        ciudad: "Bogotá ",
        cantidad: 2,
        precio: 26000
    }
];


// Reproducir el error sin normalización
const gruposIncorrectos = {};

for (const venta of datosPrueba) {
    gruposIncorrectos[venta.ciudad] =
        (gruposIncorrectos[venta.ciudad] || 0)
        + valorVenta(venta);
}

console.log("Antes de corregir:");
console.log(gruposIncorrectos);


// Aplicar la función corregida
const gruposCorrectos = totalPorCiudad(datosPrueba);

console.log("Después de corregir:");
console.log(gruposCorrectos);

console.log(
    Object.keys(gruposCorrectos).length === 1 &&
    gruposCorrectos["Bogotá"] === 78000
        ? "OK: No existen ciudades duplicadas"
        : "ERROR: Agrupación incorrecta"
);


// ERROR 2: Ticket promedio NaN

console.log("\n--- DEPURACIÓN 2: TICKET PROMEDIO ---");

const diaSinVentas = ventasDelDia(ventas, "2026-09-07");


// Reproducir el error
const ticketIncorrecto =
    totalVendido(diaSinVentas) / diaSinVentas.length;

console.log("Antes de corregir:", ticketIncorrecto);


// Aplicar la función corregida
const ticketCorrecto = ticketPromedio(diaSinVentas);

console.log("Después de corregir:", ticketCorrecto);

console.log(
    ticketCorrecto === 0
        ? "OK: El ticket promedio devuelve cero"
        : "ERROR: Ticket promedio incorrecto"
);


// Comprobar la base de datos completa
console.log("\n--- VERIFICACIÓN FINAL ---");

console.log(
    Object.keys(totalPorCiudad(ventas)).length === 4
        ? "OK: Existen exactamente cuatro ciudades"
        : "ERROR: Cantidad incorrecta de ciudades"
);
