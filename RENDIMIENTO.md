# Café Origen — Informe de rendimiento v0.2

## Metodología

- Node.js: v26.13.0
- Sistema: linux x64
- Procesador: Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz
- Fecha: 2026-11-27T12:30:04.001Z
- Registros analizados: 10000
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
| valorVenta | Calcula el valor de una venta | O(1) | O(1) | Multiplicación de dos propiedades | 0.000007 |
| totalVendido | Calcula los ingresos totales | O(n) | O(1) | Un recorrido y un acumulador | 0.128395 |
| unidadesVendidas | Suma las unidades vendidas | O(n) | O(1) | Un recorrido y un acumulador | 0.091631 |
| ventaMayor | Encuentra la venta de mayor valor | O(n) | O(1) | Recorrido completo y referencia al máximo | 0.113478 |
| ticketPromedio | Calcula el promedio por venta válida | O(n) | O(1) | Dos recorridos lineales y variables escalares | 0.297367 |
| ventasPorCiudad | Calcula ingresos de una ciudad | O(n) | O(1) | Un recorrido con comparación y acumulación | 0.489544 |
| totalVendidoM | Ingresos mediante métodos | O(n) | O(n) | Filter y map crean arreglos intermedios | 0.371142 |
| unidadesVendidasM | Unidades mediante métodos | O(n) | O(n) | Filter, map y reduce | 0.314281 |
| ventasPorCiudadM | Ingresos por ciudad mediante métodos | O(n) | O(n) | Filtrado y transformación de arreglos | 0.452674 |
| totalPorCiudad | Agrupa ingresos por ciudad | O(n) | O(n) | Filter crea un arreglo y reduce un diccionario | 1.715195 |
| unidadesPorProducto | Agrupa unidades por producto | O(n) | O(n) | Arreglo filtrado y diccionario de productos | 0.507554 |
| topProductosPorValor | Ordena productos por ingresos | O(n + p log p) | O(n) | Agrupación de ventas y ordenamiento de p productos | 0.512099 |
| ventasDelDia | Filtra las ventas de una fecha | O(n) | O(n) | Filter recorre y crea un arreglo | 0.142747 |
| totalVendidoI | Total vendido instrumentado | O(n) | O(1) | Un recorrido, acumulador y contador | 0.137163 |
| ventaMayorI | Venta mayor instrumentada | O(n) | O(1) | Un recorrido y comparaciones | 0.140152 |
| totalPorCiudadI | Agrupación instrumentada | O(n) | O(c) | Un recorrido y un diccionario de ciudades | 1.677445 |
| primeraVenta | Obtiene el primer registro | O(1) | O(1) | Acceso directo al índice cero | 0.000007 |
| clientesRecurrentes | Identifica clientes recurrentes | O(n²) en pares; O(n³) peor caso | O(n) | Ciclos anidados y búsquedas mediante includes | 546.310174 |
| totalCiudadCadena | Ingresos mediante métodos encadenados | O(n) | O(n) | Cuatro etapas y tres arreglos nuevos | 0.879572 |
| totalCiudadUnaPasada | Ingresos mediante recorrido único | O(n) | O(1) | Un ciclo sin arreglos intermedios | 0.393561 |
| generarVentas | Genera ventas sintéticas | O(n) | O(n) | Crea un arreglo de n objetos | 2.403904 |


## Evidencia de los MiniRetos 5 a 7

### MiniReto 5: operaciones

| Función | Operaciones con 10000 ventas |
|---|---:|
| totalVendidoI | 20000 |
| ventaMayorI | 39999 |
| totalPorCiudadI | 20000 |
| primeraVenta | 1 |

### MiniReto 6: complejidad cuadrática

Comparaciones entre pares de clientes:

C(n) = n(n - 1) / 2

Para 10000 ventas:

49995000 comparaciones.

Estas comparaciones no incluyen el costo interno de includes.

Los ciclos anidados presentan crecimiento cuadrático.
Sin embargo, includes puede agregar búsquedas lineales en cada coincidencia,
produciendo un peor caso cúbico.

### MiniReto 7: complejidad espacial

| Indicador | Cadena | Una pasada |
|---|---:|---:|
| Recorridos o etapas | 4 | 1 |
| Visitas | 24984 | 10000 |
| Arreglos nuevos | 3 | 0 |
| Tiempo Big O | O(n) | O(n) |
| Espacio Big O | O(n) | O(1) |
| Resultado monetario | 497968000 | 497968000 |

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
| valorVenta | 0.000007 ms | 0.000007 ms |
| totalVendido | 0.128395 ms | 12.839460 ms |
| unidadesVendidas | 0.091631 ms | 9.163080 ms |
| ventaMayor | 0.113478 ms | 11.347760 ms |
| ticketPromedio | 0.297367 ms | 29.736740 ms |
| ventasPorCiudad | 0.489544 ms | 48.954380 ms |
| totalVendidoM | 0.371142 ms | 37.114200 ms |
| unidadesVendidasM | 0.314281 ms | 31.428120 ms |
| ventasPorCiudadM | 0.452674 ms | 45.267420 ms |
| totalPorCiudad | 1.715195 ms | 171.519520 ms |
| unidadesPorProducto | 0.507554 ms | 50.755440 ms |
| topProductosPorValor | 0.512099 ms | 51.209920 ms |
| ventasDelDia | 0.142747 ms | 14.274680 ms |
| totalVendidoI | 0.137163 ms | 13.716340 ms |
| ventaMayorI | 0.140152 ms | 14.015220 ms |
| totalPorCiudadI | 1.677445 ms | 167.744500 ms |
| primeraVenta | 0.000007 ms | 0.000007 ms |
| clientesRecurrentes | 546.310174 ms | 1.52 horas |
| totalCiudadCadena | 0.879572 ms | 87.957180 ms |
| totalCiudadUnaPasada | 0.393561 ms | 39.356080 ms |
| generarVentas | 2.403904 ms | 240.390360 ms |


### Proyección por sección del reporte

| Reporte | 10000 ventas | 1000000 ventas |
|---|---|---|
| Resumen general | 0.544616 ms | 54.461620 ms |
| Ingresos por ciudad | 1.786741 ms | 178.674140 ms |
| Ranking por unidades | 0.492127 ms | 49.212720 ms |
| Top 3 productos | 0.489600 ms | 48.960000 ms |
| Día con ventas | 0.137875 ms | 13.787540 ms |
| Día sin ventas | 0.134143 ms | 13.414280 ms |
| Total de las seis secciones | 3.585103 ms | 358.510300 ms |
| Clientes recurrentes | 546.310174 ms | 1.52 horas |

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
