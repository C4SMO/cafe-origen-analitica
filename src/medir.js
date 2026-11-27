const generarVentas = require("./generador.js");

const {
    totalVendidoI,
    ventaMayorI,
    totalPorCiudadI,
    primeraVenta
} = require("./analitica.js");

const tamanos = [
    100,
    1000,
    10000,
    100000
];

const resultados = [];

for (const n of tamanos) {

    const ventas = generarVentas(n);

    const contadorTotal = { operaciones: 0 };
    const contadorMayor = { operaciones: 0 };
    const contadorCiudad = { operaciones: 0 };
    const contadorPrimera = { operaciones: 0 };

    totalVendidoI(ventas, contadorTotal);
    ventaMayorI(ventas, contadorMayor);
    totalPorCiudadI(ventas, contadorCiudad);
    primeraVenta(ventas, contadorPrimera);

    resultados.push({
        n: n,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudad.operaciones,
        primeraVenta: contadorPrimera.operaciones
    });
}

console.log("\nCAFÉ ORIGEN | ANÁLISIS DE OPERACIONES");
console.table(resultados);