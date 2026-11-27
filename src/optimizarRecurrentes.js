
const assert = require("node:assert/strict");
const { performance } = require("node:perf_hooks");

const ventasOriginales = require("./datos.js");
const generarVentas = require("./generador.js");

const {
    clientesRecurrentes,
    clientesRecurrentesSet,
    clientesRecurrentesMap,
    comprasPorCliente
} = require("./analitica.js");


// ========================================
// VERIFICACIÓN DE RESULTADOS
// ========================================

function verificar(ventas, nombre) {
    const original = clientesRecurrentes(ventas).sort();
    const versionSet = clientesRecurrentesSet(ventas).sort();
    const versionMap = clientesRecurrentesMap(ventas).sort();

    assert.deepEqual(versionSet, original);
    assert.deepEqual(versionMap, original);

    console.log(`OK: ${nombre}`);

    console.log(
        "Clientes recurrentes:",
        new Set(original).size
    );
}

console.log("\n--- VERIFICACIÓN DE ALGORITMOS ---");

verificar(ventasOriginales, "Datos originales");

assert.deepEqual(
    clientesRecurrentesSet(ventasOriginales).sort(),
    ["C01", "C02", "C03"]
);

verificar(generarVentas(5000), "5000 ventas generadas");

verificar([], "Arreglo vacío");

verificar(
    [ventasOriginales[0]],
    "Una sola venta"
);

verificar(
    [ventasOriginales[0], ventasOriginales[0]],
    "Cliente repetido"
);


// Verificar frecuencias

console.log("\n--- COMPRAS POR CLIENTE ---");

const compras = comprasPorCliente(ventasOriginales);

assert.equal(compras.get("C01"), 3);
assert.equal(compras.get("C02"), 2);
assert.equal(compras.get("C03"), 2);

console.table(
    [...compras].map(([cliente, cantidad]) => ({
        cliente,
        compras: cantidad
    }))
);


// ========================================
// MEDICIÓN DE RENDIMIENTO
// ========================================

function medir(nombre, funcion, ventas) {

    // Calentamiento
    funcion(ventas);

    const tiempos = [];

    for (let i = 0; i < 3; i++) {

        const etiqueta = `${nombre} - prueba ${i + 1}`;

        console.time(etiqueta);

        const inicio = performance.now();

        funcion(ventas);

        tiempos.push(performance.now() - inicio);

        console.timeEnd(etiqueta);
    }

    tiempos.sort((a, b) => a - b);

    return tiempos[1];
}


// ========================================
// COMPARACIÓN DE ALGORITMOS
// ========================================

const tamanos = [1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {

    console.log(`\n--- ${n} VENTAS ---`);

    const ventas = generarVentas(n);

    // Evitar ejecutar la versión lenta con 100000
    const original = n <= 10000
        ? medir("Original", clientesRecurrentes, ventas)
        : null;

    const versionSet = medir(
        "Set",
        clientesRecurrentesSet,
        ventas
    );

    const versionMap = medir(
        "Map",
        clientesRecurrentesMap,
        ventas
    );

    resultados.push({
        ventas: n,
        original_ms: original === null
            ? "Omitido"
            : original.toFixed(4),
        set_ms: versionSet.toFixed(4),
        map_ms: versionMap.toFixed(4),
        mejora_set: original === null
            ? "-"
            : (original / versionSet).toFixed(2) + "x",
        mejora_map: original === null
            ? "-"
            : (original / versionMap).toFixed(2) + "x"
    });

    if (n === 100000) {

        console.log(
            "Set:",
            versionSet < 1000
                ? "OK: Menos de un segundo"
                : "NO CUMPLE"
        );

        console.log(
            "Map:",
            versionMap < 1000
                ? "OK: Menos de un segundo"
                : "NO CUMPLE"
        );
    }
}

console.log("\n--- RESULTADOS FINALES ---");

console.table(resultados);


// Tabla Markdown para la bitácora

console.log("\n--- COPIAR EN BITACORA.MD ---");

console.log(
    "| Ventas | Original (ms) | Set (ms) | Map (ms) |"
);

console.log(
    "|---:|---:|---:|---:|"
);

for (const r of resultados) {
    console.log(
        `| ${r.ventas} | ${r.original_ms} | ${r.set_ms} | ${r.map_ms} |`
    );
}
