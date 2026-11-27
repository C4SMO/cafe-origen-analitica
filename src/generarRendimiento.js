
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { performance } = require("node:perf_hooks");
const assert = require("node:assert/strict");

const generarVentas = require("./generador.js");
const a = require("./analitica.js");
const originales = require("./datos.js");

const N = 10000;
const FUTURO = 1000000;

const ventas = generarVentas(N);
const ciudad = "  MEDELLÍN  ";
const fecha = "2026-09-01";

const estadoOriginal = JSON.stringify(ventas);

const contador = () => ({ operaciones: 0 });


// ========================================
// VERIFICACIONES
// ========================================

assert.equal(ventas.length, N);

assert.deepEqual(
    a.clientesRecurrentes(originales),
    ["C01", "C02", "C03"]
);

assert.equal(
    a.totalVendido(ventas),
    a.totalVendidoM(ventas)
);

assert.equal(
    a.unidadesVendidas(ventas),
    a.unidadesVendidasM(ventas)
);

assert.equal(
    a.ventasPorCiudad(ventas, ciudad),
    a.ventasPorCiudadM(ventas, ciudad)
);

assert.equal(
    a.totalCiudadCadena(ventas, ciudad),
    a.totalCiudadUnaPasada(ventas, ciudad)
);

assert.equal(
    a.totalCiudadUnaPasada(ventas, ciudad),
    a.ventasPorCiudad(ventas, ciudad)
);

assert.equal(a.totalCiudadCadena([], ciudad), 0);
assert.equal(a.totalCiudadUnaPasada([], ciudad), 0);

assert.equal(
    a.totalVendidoI(ventas, contador()),
    a.totalVendido(ventas)
);

assert.deepEqual(
    a.ventaMayorI(ventas, contador()),
    a.ventaMayor(ventas)
);

assert.deepEqual(
    a.totalPorCiudadI(ventas, contador()),
    a.totalPorCiudad(ventas)
);

console.log("OK: equivalencia entre algoritmos");


// ========================================
// MEDICIÓN DE TIEMPOS
// ========================================

let resultado;

function medir(fn, repeticiones = 5) {

    // Calentamiento
    resultado = fn();

    const muestras = [];

    for (let i = 0; i < 3; i++) {

        const inicio = performance.now();

        for (let j = 0; j < repeticiones; j++) {
            resultado = fn();
        }

        const tiempo = performance.now() - inicio;

        muestras.push(tiempo / repeticiones);
    }

    muestras.sort((x, y) => x - y);

    return muestras[1];
}


// ========================================
// CONTEO DE OPERACIONES
// ========================================

function operaciones(fn) {
    const c = contador();

    fn(ventas, c);

    return c.operaciones;
}

const coincidencias = ventas.filter(venta =>
    venta.cantidad > 0 &&
    venta.ciudad.trim().toLowerCase() ===
    ciudad.trim().toLowerCase()
).length;


// ========================================
// CLASIFICACIÓN DE LAS FUNCIONES
// ========================================

const funciones = [

    [
        "valorVenta",
        "Calcula el valor de una venta",
        "O(1)",
        "O(1)",
        "Multiplicación de dos propiedades",
        () => a.valorVenta(ventas[0]),
        0
    ],

    [
        "totalVendido",
        "Calcula los ingresos totales",
        "O(n)",
        "O(1)",
        "Un recorrido y un acumulador",
        () => a.totalVendido(ventas),
        1
    ],

    [
        "unidadesVendidas",
        "Suma las unidades vendidas",
        "O(n)",
        "O(1)",
        "Un recorrido y un acumulador",
        () => a.unidadesVendidas(ventas),
        1
    ],

    [
        "ventaMayor",
        "Encuentra la venta de mayor valor",
        "O(n)",
        "O(1)",
        "Recorrido completo y referencia al máximo",
        () => a.ventaMayor(ventas),
        1
    ],

    [
        "ticketPromedio",
        "Calcula el promedio por venta válida",
        "O(n)",
        "O(1)",
        "Dos recorridos lineales y variables escalares",
        () => a.ticketPromedio(ventas),
        1
    ],

    [
        "ventasPorCiudad",
        "Calcula ingresos de una ciudad",
        "O(n)",
        "O(1)",
        "Un recorrido con comparación y acumulación",
        () => a.ventasPorCiudad(ventas, ciudad),
        1
    ],

    [
        "totalVendidoM",
        "Ingresos mediante métodos",
        "O(n)",
        "O(n)",
        "Filter y map crean arreglos intermedios",
        () => a.totalVendidoM(ventas),
        1
    ],

    [
        "unidadesVendidasM",
        "Unidades mediante métodos",
        "O(n)",
        "O(n)",
        "Filter, map y reduce",
        () => a.unidadesVendidasM(ventas),
        1
    ],

    [
        "ventasPorCiudadM",
        "Ingresos por ciudad mediante métodos",
        "O(n)",
        "O(n)",
        "Filtrado y transformación de arreglos",
        () => a.ventasPorCiudadM(ventas, ciudad),
        1
    ],

    [
        "totalPorCiudad",
        "Agrupa ingresos por ciudad",
        "O(n)",
        "O(n)",
        "Filter crea un arreglo y reduce un diccionario",
        () => a.totalPorCiudad(ventas),
        1
    ],

    [
        "unidadesPorProducto",
        "Agrupa unidades por producto",
        "O(n)",
        "O(n)",
        "Arreglo filtrado y diccionario de productos",
        () => a.unidadesPorProducto(ventas),
        1
    ],

    [
        "topProductosPorValor",
        "Ordena productos por ingresos",
        "O(n + p log p)",
        "O(n)",
        "Agrupación de ventas y ordenamiento de p productos",
        () => a.topProductosPorValor(ventas, 3),
        1
    ],

    [
        "ventasDelDia",
        "Filtra las ventas de una fecha",
        "O(n)",
        "O(n)",
        "Filter recorre y crea un arreglo",
        () => a.ventasDelDia(ventas, fecha),
        1
    ],

    [
        "totalVendidoI",
        "Total vendido instrumentado",
        "O(n)",
        "O(1)",
        "Un recorrido, acumulador y contador",
        () => a.totalVendidoI(ventas, contador()),
        1
    ],

    [
        "ventaMayorI",
        "Venta mayor instrumentada",
        "O(n)",
        "O(1)",
        "Un recorrido y comparaciones",
        () => a.ventaMayorI(ventas, contador()),
        1
    ],

    [
        "totalPorCiudadI",
        "Agrupación instrumentada",
        "O(n)",
        "O(c)",
        "Un recorrido y un diccionario de ciudades",
        () => a.totalPorCiudadI(ventas, contador()),
        1
    ],

    [
        "primeraVenta",
        "Obtiene el primer registro",
        "O(1)",
        "O(1)",
        "Acceso directo al índice cero",
        () => a.primeraVenta(ventas, contador()),
        0
    ],

    [
        "clientesRecurrentes",
        "Identifica clientes recurrentes",
        "O(n²) en pares; O(n³) peor caso",
        "O(n)",
        "Ciclos anidados y búsquedas mediante includes",
        () => a.clientesRecurrentes(ventas),
        2
    ],

    [
        "totalCiudadCadena",
        "Ingresos mediante métodos encadenados",
        "O(n)",
        "O(n)",
        "Cuatro etapas y tres arreglos nuevos",
        () => a.totalCiudadCadena(ventas, ciudad),
        1
    ],

    [
        "totalCiudadUnaPasada",
        "Ingresos mediante recorrido único",
        "O(n)",
        "O(1)",
        "Un ciclo sin arreglos intermedios",
        () => a.totalCiudadUnaPasada(ventas, ciudad),
        1
    ],

    [
        "generarVentas",
        "Genera ventas sintéticas",
        "O(n)",
        "O(n)",
        "Crea un arreglo de n objetos",
        () => generarVentas(N),
        1
    ]

];


// ========================================
// EJECUTAR MEDICIONES
// ========================================

const resultados = [];

for (const funcion of funciones) {

    const [
        nombre,
        descripcion,
        temporal,
        espacial,
        justificacion,
        ejecutar,
        exponente
    ] = funcion;

    console.log(`Midiendo: ${nombre}`);

    let repeticiones = 5;

    if (exponente === 0) {
        repeticiones = 100000;
    }

    if (nombre === "clientesRecurrentes") {
        repeticiones = 1;
    }

    const tiempo = medir(ejecutar, repeticiones);

    const factor = (FUTURO / N) ** exponente;

    const proyeccion = tiempo * factor;

    resultados.push({
        nombre,
        descripcion,
        temporal,
        espacial,
        justificacion,
        tiempo,
        proyeccion
    });
}

assert.equal(
    JSON.stringify(ventas),
    estadoOriginal
);


// ========================================
// FORMATO DE TIEMPOS
// ========================================

function duracion(ms) {

    if (ms >= 3600000) {
        return `${(ms / 3600000).toFixed(2)} horas`;
    }

    if (ms >= 60000) {
        return `${(ms / 60000).toFixed(2)} minutos`;
    }

    if (ms >= 1000) {
        return `${(ms / 1000).toFixed(3)} segundos`;
    }

    return `${ms.toFixed(6)} ms`;
}


// ========================================
// MEDICIÓN DE REPORTES
// ========================================

function resumen(datos) {
    return [
        a.totalVendido(datos),
        a.unidadesVendidas(datos),
        a.ventaMayor(datos),
        a.ticketPromedio(datos)
    ];
}

const reportes = [

    [
        "Resumen general",
        () => resumen(ventas)
    ],

    [
        "Ingresos por ciudad",
        () => Object.entries(a.totalPorCiudad(ventas))
            .sort((x, y) => y[1] - x[1])
    ],

    [
        "Ranking por unidades",
        () => Object.entries(a.unidadesPorProducto(ventas))
            .sort((x, y) => y[1] - x[1])
    ],

    [
        "Top 3 productos",
        () => a.topProductosPorValor(ventas, 3)
    ],

    [
        "Día con ventas",
        () => resumen(a.ventasDelDia(ventas, fecha))
    ],

    [
        "Día sin ventas",
        () => resumen(a.ventasDelDia(ventas, "2026-10-01"))
    ]

];

const resultadosReportes = reportes.map(([nombre, fn]) => ({
    nombre,
    tiempo: medir(fn)
}));


// ========================================
// GENERAR DOCUMENTO MARKDOWN
// ========================================

let informe = `# Café Origen — Informe de rendimiento v0.2

## Metodología

- Node.js: ${process.version}
- Sistema: ${os.platform()} ${os.arch()}
- Procesador: ${os.cpus()[0]?.model || "No identificado"}
- Fecha: ${new Date().toISOString()}
- Registros analizados: ${N}
- Medición: mediana de tres muestras después de calentamiento.
- Se promedian cinco llamadas por muestra, excepto las funciones constantes
  (100000 llamadas) y clientesRecurrentes (una llamada).
- Se excluye la generación de datos de las mediciones del motor.
- Los datos son sintéticos y aleatorios.
- La complejidad espacial se analiza mediante el código, no mediante bytes medidos.

Variables:

- n: número de ventas.
- p: productos distintos.
- c: ciudades distintas.

Se asume un catálogo fijo de cinco productos y cuatro ciudades para las proyecciones.
Se consideran cadenas de longitud acotada y acceso esperado constante a diccionarios.
El espacio adicional incluye las colecciones de salida, pero no la entrada.
Para sort se utiliza el modelo de ordenamiento O(p log p), cuya complejidad depende de la implementación.

## Clasificación de funciones

| Función | Qué hace | Tiempo | Espacio | Justificación | Medición (ms) |
|---|---|---|---|---|---:|
`;

for (const r of resultados) {

    informe += `| ${r.nombre} | ${r.descripcion} | ${r.temporal} | ${r.espacial} | ${r.justificacion} | ${r.tiempo.toFixed(6)} |\n`;

}


// ========================================
// EVIDENCIA DE LOS MINIRETOS ANTERIORES
// ========================================

informe += `

## Evidencia de los MiniRetos 5 a 7

### MiniReto 5: operaciones

| Función | Operaciones con 10000 ventas |
|---|---:|
| totalVendidoI | ${operaciones(a.totalVendidoI)} |
| ventaMayorI | ${operaciones(a.ventaMayorI)} |
| totalPorCiudadI | ${operaciones(a.totalPorCiudadI)} |
| primeraVenta | ${operaciones(a.primeraVenta)} |

### MiniReto 6: complejidad cuadrática

Comparaciones entre pares de clientes:

C(n) = n(n - 1) / 2

Para 10000 ventas:

${N * (N - 1) / 2} comparaciones.

Estas comparaciones no incluyen el costo interno de includes.

Los ciclos anidados presentan crecimiento cuadrático.
Sin embargo, includes puede agregar búsquedas lineales en cada coincidencia,
produciendo un peor caso cúbico.

### MiniReto 7: complejidad espacial

| Indicador | Cadena | Una pasada |
|---|---:|---:|
| Recorridos o etapas | 4 | 1 |
| Visitas | ${2 * N + 2 * coincidencias} | ${N} |
| Arreglos nuevos | 3 | 0 |
| Tiempo Big O | O(n) | O(n) |
| Espacio Big O | O(n) | O(1) |
| Resultado monetario | ${a.totalCiudadCadena(ventas, ciudad)} | ${a.totalCiudadUnaPasada(ventas, ciudad)} |

Ambas funciones devuelven el mismo resultado.
El arreglo original conserva su contenido y orden.

## Proyección

Se proyecta el rendimiento desde 10000 hasta 1000000 de ventas.

- O(1): factor 1.
- O(n): factor 100.
- O(n²): factor 10000.

Fórmula:

T(n) = T₀ × (n / n₀)^d

El ranking se proyecta linealmente porque el catálogo de productos es fijo.
La función clientesRecurrentes se proyecta bajo un escenario cuadrático.
Su peor caso cúbico puede producir tiempos superiores.

| Función | Tiempo medido | Tiempo proyectado |
|---|---|---|
`;

for (const r of resultados) {

    informe += `| ${r.nombre} | ${duracion(r.tiempo)} | ${duracion(r.proyeccion)} |\n`;

}

informe += `

### Proyección por sección del reporte

| Reporte | 10000 ventas | 1000000 ventas |
|---|---|---|
`;

for (const r of resultadosReportes) {

    informe += `| ${r.nombre} | ${duracion(r.tiempo)} | ${duracion(r.tiempo * 100)} |\n`;

}

const tiempoReporte = resultadosReportes.reduce(
    (total, r) => total + r.tiempo,
    0
);

const recurrentes = resultados.find(
    r => r.nombre === "clientesRecurrentes"
);

informe += `| Total de las seis secciones | ${duracion(tiempoReporte)} | ${duracion(tiempoReporte * 100)} |
| Clientes recurrentes | ${duracion(recurrentes.tiempo)} | ${duracion(recurrentes.proyeccion)} |

Las mediciones de los reportes excluyen la impresión en consola y el formato.
El total corresponde a la suma de las medianas de las seis secciones.
Las estimaciones no son mediciones reales de un millón de registros.
Pueden variar debido a la memoria, el procesador y la distribución de datos.

## Riesgos

El criterio de clasificación considera primero el crecimiento temporal,
después el consumo de memoria y finalmente la cantidad de recorridos.

### 1. Riesgo crítico

- clientesRecurrentes.

Realiza comparaciones repetidas mediante ciclos anidados.
Includes añade búsquedas adicionales y puede producir un costo cúbico.

### 2. Riesgo alto

- topProductosPorValor.
- totalCiudadCadena.

Crean arreglos intermedios. El ranking añade ordenamiento
y la versión encadenada crea copias de los objetos.

### 3. Riesgo medio-alto

- totalVendidoM.
- unidadesVendidasM.
- ventasPorCiudadM.
- totalPorCiudad.
- unidadesPorProducto.
- ventasDelDia.
- generarVentas (función auxiliar de pruebas).

Utilizan memoria proporcional al volumen de datos.

### 4. Riesgo medio-bajo

- totalVendido.
- unidadesVendidas.
- ventaMayor.
- ticketPromedio.
- ventasPorCiudad.
- totalVendidoI.
- ventaMayorI.
- totalPorCiudadI.
- totalCiudadUnaPasada.

Su crecimiento temporal es lineal y evitan arreglos intermedios.
TotalPorCiudadI almacena únicamente las ciudades distintas.

### 5. Riesgo bajo

- valorVenta.
- primeraVenta.

Su costo es constante.

## Plan de optimización

La función prioritaria es clientesRecurrentes.

Actualmente compara cada venta con todas las posteriores y realiza
búsquedas repetidas para evitar clientes duplicados.

Se propone almacenar la frecuencia de cada cliente mediante un objeto
o Map.

El algoritmo futuro recorrería las ventas una sola vez para contar
las apariciones de cada cliente. Posteriormente seleccionaría los
clientes con una frecuencia superior a uno.

Para conservar el comportamiento original, los clientes se devolverían
en el orden de su primera aparición. Se mantendría el criterio actual
de contar registros, incluso cuando la cantidad sea cero.

Complejidad esperada:

- Tiempo: O(n).
- Espacio: O(u), siendo u el número de clientes distintos.

La optimización no se implementa en esta versión.

También se recomienda utilizar totalCiudadUnaPasada como alternativa
preferida para servidores con memoria limitada.

## Conclusión

El motor de analítica presenta principalmente algoritmos lineales.

El reporte de clientes recurrentes constituye el mayor riesgo de
escalabilidad debido a sus comparaciones y búsquedas repetidas.

La optimización futura debe reducir el trabajo redundante y evitar
la creación innecesaria de estructuras intermedias.

Las proyecciones deben validarse en un entorno representativo antes
de asumir compromisos de rendimiento en producción.
`;


// ========================================
// GUARDAR EL INFORME
// ========================================

const ruta = path.join(
    __dirname,
    "..",
    "RENDIMIENTO.md"
);

fs.writeFileSync(ruta, informe, "utf8");


// ========================================
// RESULTADOS POR CONSOLA
// ========================================

console.table(
    resultados.map(r => ({
        funcion: r.nombre,
        tiempo_ms: r.tiempo.toFixed(6),
        proyeccion: duracion(r.proyeccion)
    }))
);

console.log("OK: datos originales intactos");
console.log("OK: RENDIMIENTO.md generado correctamente");
console.log("Ruta:", ruta);
