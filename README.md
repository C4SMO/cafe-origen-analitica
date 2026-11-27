# Café Origen Analítica

Motor de analítica de ventas desarrollado con JavaScript y Node.js para Café Origen.

## Versión 0.1 — En desarrollo

El proyecto busca responder preguntas de negocio mediante el procesamiento de arreglos de objetos.

## Estructura

- `src/datos.js`: historial de ventas.
- `src/analitica.js`: funciones de análisis.
- `src/explorar.js`: exploración de datos.
- `bitacora.md`: documentación técnica y decisiones.

## Tecnologías

- JavaScript
- Node.js
- CommonJS
- Git y GitHub

## Ejecución

Desde la raíz del proyecto:

`node src/explorar.js`


## MiniReto 2 — Indicadores de negocio

Se implementaron seis funciones de análisis mediante ciclos manuales:

- `valorVenta()`
- `totalVendido()`
- `unidadesVendidas()`
- `ventaMayor()`
- `ticketPromedio()`
- `ventasPorCiudad()`

Se aplicaron los patrones contador, acumulador y máximo, incluyendo el manejo de arreglos vacíos y la normalización de ciudades.

### Ejecutar las pruebas

`node src/pruebas.js`


## MiniReto 3 — Métodos de arreglos y rankings

Se incorporaron versiones de los indicadores mediante map, filter y reduce, junto con nuevas funciones de agrupación y clasificación.

### Nuevas funcionalidades

- Total vendido mediante métodos de arreglo.
- Unidades vendidas mediante métodos de arreglo.
- Ingresos por ciudad.
- Agrupación de unidades por producto.
- Ranking de productos por ingresos.
- Verificación de equivalencia entre algoritmos.
- Comprobación de integridad de los datos originales.

### Ejecutar las verificaciones

`node src/verificar.js`





# Café Origen — Motor de Analítica

**Versión:** v0.1  
**Agencia:** Nodo Digital

## Descripción

Motor de analítica de ventas desarrollado con JavaScript y Node.js para Café Origen, una tostadora de café de especialidad de Medellín.

El proyecto permite transformar registros de ventas en indicadores de negocio mediante ciclos manuales, métodos de arreglos, agrupaciones y rankings.

## Preguntas de negocio

- ¿Cuánto dinero se vendió en total?
- ¿Cuántas unidades se vendieron?
- ¿Cuál fue la venta de mayor valor?
- ¿Cuál es el ticket promedio?
- ¿Qué ciudad genera más ingresos?
- ¿Cuál es el producto más vendido por unidades?
- ¿Cuáles son los tres productos que generan mayores ingresos?
- ¿Cuáles son los indicadores de una fecha determinada?

## Tecnologías

- JavaScript
- Node.js
- CommonJS
- Git
- GitHub

## Estructura del proyecto

| Archivo | Responsabilidad |
|---|---|
| src/datos.js | Historial de ventas |
| src/analitica.js | Funciones de análisis |
| src/explorar.js | Exploración de registros |
| src/pruebas.js | Pruebas de indicadores |
| src/verificar.js | Equivalencia entre algoritmos |
| src/depurar.js | Reproducción y corrección de errores |
| src/reporte.js | Reporte final de negocio |
| bitacora.md | Documentación y decisiones técnicas |

## Ejecución

Clonar el repositorio:

`git clone https://github.com/C4SMO/cafe-origen-analitica.git`

Ingresar al proyecto:

`cd cafe-origen-analitica`

Ejecutar el reporte:

`node src/reporte.js`

No requiere instalar dependencias externas.

## Pruebas

- Exploración: `node src/explorar.js`
- Indicadores: `node src/pruebas.js`
- Equivalencia: `node src/verificar.js`
- Depuración: `node src/depurar.js`

## Calidad de los datos

El motor normaliza los nombres de las ciudades, conserva los registros originales, excluye las cantidades iguales a cero de los indicadores de ventas efectivas y evita las divisiones entre cero.

## Historial de desarrollo

- MiniReto 1: Modelado y exploración.
- MiniReto 2: Indicadores mediante ciclos manuales.
- MiniReto 3: Métodos de arreglos, agrupaciones y rankings.
- MiniReto 4: Integración, depuración y reporte final.

## Estado del proyecto

Versión v0.1 — Motor de analítica por consola.



## MiniReto 5 — Análisis de algoritmos

Se incorporó un generador de ventas sintéticas y funciones instrumentadas para analizar el crecimiento del número de operaciones mediante la notación Big O.

### Nuevos módulos

- `src/generador.js`: generación de historiales de ventas.
- `src/medir.js`: medición y comparación de operaciones.

### Ejecutar las mediciones

`node src/medir.js`

Se analizan conjuntos de 100, 1000, 10000 y 100000 registros.

Estado: v0.2 en desarrollo.



## MiniReto 6 — Diagnóstico de algoritmos cuadráticos

Se incorporó un análisis de rendimiento de la función clientesRecurrentes, evaluando el costo de los ciclos anidados y las búsquedas mediante includes.

### Ejecutar mediciones

`node src/medirRecurrentes.js`

Se analizan conjuntos de 1000, 2000, 4000, 8000 y 16000 ventas.

### Prueba adicional

`node src/medirRecurrentes.js --100k`

La prueba adicional solamente se ejecuta cuando el tiempo estimado es inferior a dos minutos.

El algoritmo original se conserva como referencia para futuras optimizaciones.


## MiniReto 7 — Complejidad espacial

Se compararon dos implementaciones para calcular los ingresos por ciudad:

- `totalCiudadCadena`: tiempo O(n), espacio O(n).
- `totalCiudadUnaPasada`: tiempo O(n), espacio O(1).

Se seleccionó la implementación de recorrido único como alternativa preferida para entornos con memoria limitada.

### Ejecutar la comparación

## Versión v0.2 — Análisis de rendimiento

Esta versión incorpora herramientas para evaluar la eficiencia temporal y espacial del motor de analítica mediante la notación Big O.

### Nuevas funcionalidades

- Generación de historiales de ventas sintéticos.
- Instrumentación y conteo de operaciones.
- Medición de algoritmos con ciclos anidados.
- Comparación de complejidad espacial.
- Proyecciones de rendimiento.
- Identificación de riesgos y planificación de optimizaciones.

### Ejecutar las mediciones

- `node src/medir.js`
- `node src/medirRecurrentes.js`
- `node src/medirMemoria.js`

### Generar el informe técnico

`node src/generarRendimiento.js`

### Documentación

- [Informe de rendimiento](RENDIMIENTO.md)
- [Bitácora de desarrollo](bitacora.md)

**Estado del proyecto:** v0.2 — Análisis y diagnóstico de rendimiento.


## MiniReto 9 — Optimización de clientes recurrentes

Se incorporaron algoritmos basados en Set y Map para reemplazar las búsquedas repetitivas del reporte de clientes recurrentes.

### Nuevas funciones

- `clientesRecurrentesSet()`
- `comprasPorCliente()`
- `clientesRecurrentesMap()`

Complejidad temporal de las nuevas implementaciones: O(n) esperada.

### Ejecutar las pruebas y mediciones

`node src/optimizarRecurrentes.js`

Se evalúan conjuntos de 1000, 10000 y 100000 ventas.

Estado: v1.0 en desarrollo.

`node src/medirMemoria.js`

La prueba utiliza 10000 ventas generadas y verifica la equivalencia de los resultados, los recorridos, la creación de arreglos y la integridad de los datos originales.