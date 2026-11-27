const generarVentas = require("./generador.js");

const {
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./analitica.js");

const ventas = generarVentas(10000);
const ciudad = "  MEDELLÍN  ";

const estadoOriginal = JSON.stringify(ventas);


// Ejecutar ambas versiones
const cadena = totalCiudadCadena(ventas, ciudad);
const unaPasada = totalCiudadUnaPasada(ventas, ciudad);


// Contar registros que cumplen la condición
let coincidencias = 0;

for (const venta of ventas) {
    if (
        venta.ciudad.trim().toLowerCase() ===
        ciudad.trim().toLowerCase() &&
        venta.cantidad > 0
    ) {
        coincidencias++;
    }
}


// Comparar resultados
console.log("\n--- VERIFICACIÓN ---");

console.log(
    cadena === unaPasada
        ? "OK: Ambas funciones devuelven el mismo valor"
        : "DIFERENTE"
);


// Tabla de complejidad
console.table([
    {
        version: "Cadena",
        resultado: cadena,
        recorridos: 4,
        visitas: 2 * ventas.length + 2 * coincidencias,
        arreglosNuevos: 3,
        tiempo: "O(n)",
        espacio: "O(n)"
    },
    {
        version: "Una pasada",
        resultado: unaPasada,
        recorridos: 1,
        visitas: ventas.length,
        arreglosNuevos: 0,
        tiempo: "O(n)",
        espacio: "O(1)"
    }
]);


// Verificar arreglos vacíos
console.log("\n--- CASOS BORDE ---");

console.log(
    "Cadena vacía:",
    totalCiudadCadena([], ciudad)
);

console.log(
    "Una pasada vacía:",
    totalCiudadUnaPasada([], ciudad)
);


// Verificar integridad
console.log(
    estadoOriginal === JSON.stringify(ventas)
        ? "OK: Datos originales intactos"
        : "ERROR: Datos modificados"
);