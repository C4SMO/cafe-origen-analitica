const ventas = require("./datos.js");

const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
} = require("./analitica.js");

function probar(datos) {
    console.log("Cantidad de registros:", datos.length);
    console.log("Valor primera venta:", valorVenta(datos[0]));
    console.log("Total vendido:", totalVendido(datos));
    console.log("Unidades vendidas:", unidadesVendidas(datos));
    console.log("Venta mayor:", ventaMayor(datos));
    console.log("Ticket promedio:", ticketPromedio(datos));
    console.log("Ventas Medellín:", ventasPorCiudad(datos, "Medellín"));
}

console.log("\n--- PRUEBA 1: ARREGLO COMPLETO ---");
probar(ventas);

console.log("\n--- PRUEBA 2: UN SOLO ELEMENTO ---");
probar([ventas[0]]);

console.log("\n--- PRUEBA 3: ARREGLO VACÍO ---");
probar([]);

console.log("\n--- PRUEBA 4: NORMALIZACIÓN ---");
console.log(ventasPorCiudad(ventas, "  MEDELLÍN  "));

console.log("\n--- PRUEBA 5: VENTA CON CANTIDAD CERO ---");
probar([ventas[7]]);