
const { performance } = require("node:perf_hooks");

const ventasOriginales = require("./datos.js");
const generarVentas = require("./generador.js");

const {
    clientesRecurrentes
} = require("./analitica.js");


// Verificación con los datos originales
console.log("\n--- CLIENTES RECURRENTES ---");

const clientes = clientesRecurrentes(ventasOriginales);

console.log(clientes);

console.log(
    JSON.stringify(clientes) ===
    JSON.stringify(["C01", "C02", "C03"])
        ? "OK"
        : "DIFERENTE"
);


// Calentamiento del motor de JavaScript
const calentamiento = generarVentas(1000);

for (let i = 0; i < 3; i++) {
    clientesRecurrentes(calentamiento);
}


// Medición de rendimiento
const tamanos = [1000, 2000, 4000, 8000, 16000];
const resultados = [];

let tiempoAnterior = 0;

for (const n of tamanos) {

    const ventas = generarVentas(n);
    const tiempos = [];

    // Realizar tres mediciones
    for (let r = 1; r <= 3; r++) {

        const etiqueta = `n=${n}, prueba ${r}`;

        console.time(etiqueta);

        const inicio = performance.now();

        clientesRecurrentes(ventas);

        const tiempo = performance.now() - inicio;

        console.timeEnd(etiqueta);

        tiempos.push(tiempo);
    }

    // Seleccionar la mediana
    tiempos.sort((a, b) => a - b);

    const tiempo = tiempos[1];

    resultados.push({
        n,
        comparaciones: n * (n - 1) / 2,
        tiempo_ms: Number(tiempo.toFixed(3)),
        factor: tiempoAnterior > 0
            ? Number((tiempo / tiempoAnterior).toFixed(2))
            : "-"
    });

    tiempoAnterior = tiempo;
}

console.log("\n--- RESULTADOS DE RENDIMIENTO ---");

console.table(resultados);


// Estimaciones de crecimiento cuadrático
const ultimoN = 16000;
const ultimoTiempo = tiempoAnterior;

function estimarTiempo(n) {
    return ultimoTiempo * (n / ultimoN) ** 2;
}

const estimacion100k = estimarTiempo(100000);
const estimacion1M = estimarTiempo(1000000);

console.log("\n--- ESTIMACIONES ---");

console.log(
    `100.000 ventas: ${(estimacion100k / 1000).toFixed(2)} segundos`
);

console.log(
    `1.000.000 ventas: ${(estimacion1M / 60000).toFixed(2)} minutos`
);


// Prueba adicional condicionada
if (estimacion100k < 120000) {

    console.log("\nLa estimación es inferior a dos minutos.");

    if (process.argv.includes("--100k")) {

        const ventas = generarVentas(100000);

        console.time("Prueba real de 100.000 ventas");

        clientesRecurrentes(ventas);

        console.timeEnd("Prueba real de 100.000 ventas");

    } else {
        console.log("Usa --100k para ejecutar la prueba adicional.");
    }

} else {
    console.log("Se omite la prueba de 100.000 ventas.");
}
