const ventas = require("./datos.js");

const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica.js");


// Función para comparar resultados
function verificar(nombre, ciclo, metodo) {
    const estado = ciclo === metodo ? "OK" : "DIFERENTE";

    console.log(`${nombre}: ${estado}`);
    console.log("Ciclo:", ciclo);
    console.log("Método:", metodo);
}


// Guardar el estado original de los datos
const estadoOriginal = JSON.stringify(ventas);


// Comparación de algoritmos
console.log("\n--- VERIFICACIÓN DE INDICADORES ---");

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas por ciudad",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);


// Agrupaciones
console.log("\n--- TOTAL POR CIUDAD ---");
console.table(totalPorCiudad(ventas));

console.log("\n--- UNIDADES POR PRODUCTO ---");
console.table(unidadesPorProducto(ventas));


// Ranking por unidades
console.log("\n--- RANKING POR UNIDADES ---");

const rankingUnidades = Object.entries(
    unidadesPorProducto(ventas)
)
    .map(([producto, unidades]) => ({
        producto,
        unidades
    }))
    .sort((a, b) => b.unidades - a.unidades);

console.table(rankingUnidades);


// Ranking por ingresos
console.log("\n--- TOP 3 PRODUCTOS POR VALOR ---");
console.table(topProductosPorValor(ventas, 3));


// Verificar que los datos originales no cambiaron
console.log("\n--- INTEGRIDAD DE LOS DATOS ---");

console.log(
    estadoOriginal === JSON.stringify(ventas)
        ? "OK: Los datos originales se conservan"
        : "DIFERENTE: Los datos fueron modificados"
);


// Comprobar arreglos vacíos
console.log("\n--- PRUEBAS CON ARREGLO VACÍO ---");

verificar(
    "Total vendido",
    totalVendido([]),
    totalVendidoM([])
);

verificar(
    "Unidades vendidas",
    unidadesVendidas([]),
    unidadesVendidasM([])
);

verificar(
    "Ventas por ciudad",
    ventasPorCiudad([], "Medellín"),
    ventasPorCiudadM([], "Medellín")
);


// Comprobar normalización
console.log("\n--- NORMALIZACIÓN DE CIUDADES ---");

verificar(
    "Medellín con espacios y mayúsculas",
    ventasPorCiudad(ventas, "  MEDELLÍN  "),
    ventasPorCiudadM(ventas, "  MEDELLÍN  ")
);