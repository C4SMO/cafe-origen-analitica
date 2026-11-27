# Bitácora — Café Origen Analítica

## MiniReto 1: Modelado y exploración de datos

### Diccionario de datos

| Propiedad | Tipo de dato | Descripción |
|---|---|---|
| id | Number | Identificador único del registro. |
| fecha | String | Fecha de la venta en formato AAAA-MM-DD. |
| cliente | String | Código identificador del cliente. |
| producto | String | Nombre del producto vendido. |
| ciudad | String | Ciudad donde se registra la venta. |
| cantidad | Number | Número de unidades vendidas. |
| precio | Number | Precio unitario del producto en pesos colombianos. |

### Casos borde detectados

**1. Inconsistencia en los nombres de las ciudades**

El registro 5 contiene la ciudad «medellín» en minúscula, mientras que otros registros contienen «Medellín».

Decisión: normalizar los nombres de las ciudades durante el análisis, sin modificar los datos originales.

**2. Ventas con cantidad igual a cero**

El registro 8 presenta una cantidad de cero unidades.

Decisión: conservar el registro original, pero excluirlo de los indicadores que contabilizan ventas efectivas.

**3. Clientes repetidos**

Los clientes C01, C02 y C03 aparecen en diferentes registros.

Decisión: conservar sus transacciones y evitar contabilizar varias veces al mismo cliente cuando se calculen clientes únicos. La repetición no implica necesariamente un error.

### Pseudocódigo

1. Crear un arreglo de objetos con las ventas.
2. Exportar el arreglo.
3. Importar los datos desde el módulo de exploración.
4. Consultar la cantidad de registros.
5. Consultar el primer y último registro.
6. Consultar el producto ubicado en el índice 4.
7. Mostrar la tabla completa.
8. Identificar y documentar los casos borde.

### Pruebas realizadas

- Ejecución mediante `node src/explorar.js`.
- Cantidad de registros: 12.
- Primer registro: ID 1.
- Último registro: ID 12.
- Producto en el índice 4: Origen Sierra 500 g.
- Visualización correcta de la tabla completa.
- Se corrigió un error inicial relacionado con la ruta de ejecución.

Resultado: ejecución satisfactoria.




## MiniReto 2: Indicadores mediante ciclos manuales

### Plan en pseudocódigo

#### valorVenta

- Recibir un objeto que represente una venta.
- Multiplicar la cantidad por el precio unitario.
- Retornar el resultado.

#### totalVendido

- Inicializar un acumulador total en 0.
- Recorrer el arreglo de ventas.
- Si la cantidad es mayor que 0, calcular el valor de la venta.
- Sumar el resultado al acumulador.
- Retornar el total.

#### unidadesVendidas

- Inicializar un acumulador de unidades en 0.
- Recorrer las ventas.
- Si la cantidad es mayor que 0, sumar las unidades.
- Retornar el acumulador.

#### ventaMayor

- Inicializar la venta mayor en null.
- Recorrer las ventas válidas.
- Comparar el valor de la venta actual con el mayor registrado.
- Si es superior o todavía no existe un máximo, guardar el registro actual.
- Retornar el registro completo.

#### ticketPromedio

- Inicializar un contador en 0.
- Recorrer el arreglo.
- Incrementar el contador por cada venta con cantidad mayor que 0.
- Obtener el total vendido.
- Si el contador es 0, retornar 0.
- Dividir el total vendido entre el contador.
- Retornar el resultado.

#### ventasPorCiudad

- Inicializar un acumulador en 0.
- Normalizar la ciudad solicitada.
- Recorrer las ventas.
- Normalizar la ciudad de cada registro.
- Si las ciudades coinciden y la venta es válida, acumular su valor.
- Retornar el total.

### Decisiones sobre casos borde

- Los datos originales no serán modificados.
- Las ventas con cantidad igual a cero no se consideran ventas efectivas.
- Las ciudades se normalizan mediante trim() y toLowerCase().
- Los indicadores numéricos retornan 0 cuando el arreglo está vacío.
- ventaMayor retorna null cuando no existen ventas válidas.
- En caso de empate en la venta mayor, se conserva el primer registro encontrado.
- valorVenta recibe un objeto individual, no un arreglo. Si no existe el registro, retorna 0.


### Tabla de traza 1: totalVendido

Valor inicial del acumulador: 0.

| ID | Cantidad | Precio | Valor venta | Acumulador |
|---|---:|---:|---:|---:|
| 1 | 2 | 42000 | 84000 | 84000 |
| 2 | 1 | 26000 | 26000 | 110000 |
| 3 | 1 | 95000 | 95000 | 205000 |
| 4 | 1 | 42000 | 42000 | 247000 |
| 5 | 3 | 45000 | 135000 | 382000 |
| 6 | 2 | 26000 | 52000 | 434000 |
| 7 | 1 | 120000 | 120000 | 554000 |
| 8 | 0 | 42000 | 0 | 554000 |
| 9 | 2 | 45000 | 90000 | 644000 |
| 10 | 4 | 42000 | 168000 | 812000 |
| 11 | 1 | 95000 | 95000 | 907000 |
| 12 | 3 | 26000 | 78000 | 985000 |

Resultado esperado: 985000 COP.

El registro 8 no modifica el acumulador porque su cantidad es cero.

### Tabla de traza 2: ventaMayor

Valor inicial de la variable mayor: null.

| ID | Valor actual | Máximo acumulado | ID del máximo |
|---|---:|---:|---:|
| 1 | 84000 | 84000 | 1 |
| 2 | 26000 | 84000 | 1 |
| 3 | 95000 | 95000 | 3 |
| 4 | 42000 | 95000 | 3 |
| 5 | 135000 | 135000 | 5 |
| 6 | 52000 | 135000 | 5 |
| 7 | 120000 | 135000 | 5 |
| 8 | 0 | 135000 | 5 |
| 9 | 90000 | 135000 | 5 |
| 10 | 168000 | 168000 | 10 |
| 11 | 95000 | 168000 | 10 |
| 12 | 78000 | 168000 | 10 |

Resultado esperado: registro ID 10, correspondiente al producto Origen Huila 500 g, con un valor total de 168000 COP.

### Resultados esperados de las pruebas

| Función | Arreglo completo | Un elemento | Vacío |
|---|---:|---:|---:|
| valorVenta (primer registro) | 84000 | 84000 | 0 |
| totalVendido | 985000 | 84000 | 0 |
| unidadesVendidas | 21 | 2 | 0 |
| ventaMayor | ID 10 | ID 1 | null |
| ticketPromedio | 89545.45 aprox. | 84000 | 0 |
| ventasPorCiudad | 356000 | 84000 | 0 |

### Decisiones técnicas

- Se utilizaron exclusivamente ciclos for...of para recorrer los arreglos.
- No se utilizaron los métodos map, filter ni reduce.
- Se excluyen las ventas con cantidad igual a cero de los indicadores de ventas efectivas.
- Se utiliza trim() y toLowerCase() para normalizar las ciudades.
- Se evita la división entre cero en ticketPromedio.
- Se retorna null cuando no existe una venta mayor.
- Se reutiliza valorVenta para evitar duplicar operaciones.
- Se separan las pruebas de las funciones de análisis mediante pruebas.js.
- Se conservan los datos originales.

### Comando de ejecución

`node src/pruebas.js`


## MiniReto 3: Métodos de arreglos, agrupaciones y rankings

### Objetivo

Reescribir los indicadores mediante métodos de arreglos, comprobar su equivalencia con los ciclos manuales y construir agrupaciones y rankings de productos.

### Las cinco preguntas sobre colecciones

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
|---|---|---|---|---|---|
| totalVendidoM | Ventas | Cantidades mayores que cero | Ventas en valores monetarios | Ingresos totales | No aplica |
| unidadesVendidasM | Ventas | Cantidades mayores que cero | Objetos en cantidades | Unidades vendidas | No aplica |
| ventasPorCiudadM | Ventas | Ciudad solicitada y ventas válidas | Ventas en valores monetarios | Ingresos de una ciudad | No aplica |
| totalPorCiudad | Ventas | Ventas válidas | Nombres de ciudades normalizados | Ingresos | Por ciudad |
| unidadesPorProducto | Ventas | Ventas válidas | Nombre como clave del diccionario | Cantidades | Por producto |
| topProductosPorValor | Ventas | Ventas válidas | Diccionario en arreglo de objetos | Ingresos por producto | Por producto |

### Métodos utilizados

- `filter()`: selecciona las ventas que cumplen una condición.
- `map()`: transforma los elementos de un arreglo.
- `reduce()`: acumula valores y construye agrupaciones.
- `sort()`: ordena productos mediante un criterio numérico descendente.
- `slice()`: selecciona los primeros k elementos.
- `Object.entries()`: convierte las propiedades de un objeto en pares clave-valor.
- Operador de propagación (`...`): crea una copia superficial del arreglo antes de ordenar.

### Decisiones técnicas

- Se conservan las funciones desarrolladas con ciclos manuales.
- Se utiliza un valor inicial explícito en cada reduce.
- Se excluyen registros con cantidad igual a cero.
- Se normalizan las ciudades mediante trim y toLowerCase.
- Los ingresos se calculan reutilizando valorVenta.
- Las agrupaciones utilizan objetos como diccionarios.
- El arreglo original no se modifica durante el ordenamiento.
- Los indicadores numéricos retornan cero ante arreglos vacíos.
- Las agrupaciones vacías retornan un objeto vacío y los rankings vacíos retornan un arreglo vacío.

### Resultados esperados de equivalencia

| Indicador | Ciclos | Métodos |
|---|---:|---:|
| Total vendido | 985000 | 985000 |
| Unidades vendidas | 21 | 21 |
| Ventas Medellín | 356000 | 356000 |

### Agrupación por ciudad

| Ciudad | Ingresos COP |
|---|---:|
| Medellín | 356000 |
| Bogotá | 276000 |
| Cali | 185000 |
| Pereira | 168000 |
| Total | 985000 |

### Ranking por unidades

| Producto | Unidades |
|---|---:|
| Origen Huila 500 g | 7 |
| Origen Nariño 250 g | 6 |
| Origen Sierra 500 g | 5 |
| Prensa francesa | 2 |
| Molino manual | 1 |

### Top 3 productos por ingresos

| Posición | Producto | Ingresos COP |
|---|---|---:|
| 1 | Origen Huila 500 g | 294000 |
| 2 | Origen Sierra 500 g | 225000 |
| 3 | Prensa francesa | 190000 |

### Plan de verificación

Se creó el archivo verificar.js para comparar los resultados de ambos algoritmos, comprobar el comportamiento ante arreglos vacíos, validar la normalización de ciudades y verificar que los datos originales permanezcan intactos.

Comando de ejecución: `node src/verificar.js`.



## MiniReto 4: Integración, depuración y entrega v0.1

### Objetivo

Integrar las funciones de análisis en un reporte de negocio por consola y comprobar la corrección de los errores relacionados con la agrupación de ciudades y el cálculo del ticket promedio.

### Pseudocódigo

1. Importar los datos y las funciones de análisis.
2. Crear una función para formatear valores monetarios.
3. Calcular y mostrar los indicadores generales.
4. Agrupar los ingresos por ciudad.
5. Agrupar y ordenar las unidades por producto.
6. Mostrar los tres productos con mayores ingresos.
7. Filtrar las ventas de una fecha determinada.
8. Comprobar el comportamiento de una fecha sin ventas.
9. Verificar los errores reportados.

### Depuración 1: Ciudades duplicadas

**Síntoma:** Bogotá aparece en dos grupos diferentes.

**Entrada que produce el error:** dos registros con las ciudades "Bogotá" y "Bogotá ", respectivamente.

**Hipótesis:** JavaScript interpreta las cadenas con espacios adicionales como valores diferentes.

**Prueba realizada:** se diseñó una agrupación sin normalización y se comparó con la función totalPorCiudad.

**Causa:** ausencia de normalización antes de utilizar los nombres como claves de un objeto.

**Corrección:** aplicar trim() y toLowerCase() antes de agrupar y generar un nombre uniforme para la presentación.

**Resultado esperado:** un único grupo Bogotá con ingresos de 78000 COP en los datos de prueba.

### Depuración 2: Ticket promedio igual a NaN

**Síntoma:** el ticket promedio muestra NaN cuando no existen ventas.

**Entrada que produce el error:** un arreglo vacío obtenido al consultar la fecha 2026-09-07.

**Hipótesis:** la función realiza una división entre cero.

**Prueba realizada:** se diseñó una comparación entre la operación directa 0/0 y la función ticketPromedio.

**Causa:** ausencia de una validación del contador antes de efectuar la división.

**Corrección:** comprobar si el número de ventas válidas es cero y retornar 0 antes de realizar la operación.

**Resultado esperado:** ticket promedio igual a cero, sin errores en el reporte final.

### Decisiones técnicas

- Se mantienen separados los datos, la lógica de negocio, las pruebas y el reporte.
- Se reutilizan las funciones desarrolladas en los MiniRetos anteriores.
- La función ventasDelDia retorna un arreglo de registros correspondientes a la fecha solicitada.
- Se utiliza toLocaleString("es-CO") para representar los valores monetarios.
- No se modifica el arreglo original.
- Cuando no existe una venta mayor, se muestra el mensaje "Sin ventas".
- Los errores se reproducen de forma controlada en depurar.js, sin incorporarlos al reporte final.

### Resultados esperados del reporte general

| Indicador | Resultado |
|---|---:|
| Registros | 12 |
| Ventas válidas | 11 |
| Total vendido | 985000 COP |
| Unidades vendidas | 21 |
| Venta mayor | 168000 COP |
| Ticket promedio | 89545.45 COP aprox. |
| Ciudades | 4 |

### Pruebas del reporte diario

| Indicador | 2026-09-01 | 2026-09-07 |
|---|---:|---:|
| Registros | 2 | 0 |
| Total vendido | 110000 | 0 |
| Unidades | 3 | 0 |
| Ticket promedio | 55000 | 0 |

### Comandos de verificación

- `node src/explorar.js`
- `node src/pruebas.js`
- `node src/verificar.js`
- `node src/depurar.js`
- `node src/reporte.js`

### Entrega

Versión v0.1 del motor de analítica de Café Origen, desarrollada mediante JavaScript, Node.js y CommonJS, con control de versiones mediante Git y GitHub.


## MiniReto 5: Generación de datos y conteo de operaciones

### Predicciones antes de medir

Se espera que, al multiplicar por diez el número de registros, las funciones que recorren completamente el arreglo aumenten aproximadamente diez veces su número de operaciones.

| Función | Complejidad estimada | Crecimiento esperado |
|---|---|---|
| totalVendido | O(n) | 10 veces |
| ventaMayor | O(n) | Aproximadamente 10 veces |
| totalPorCiudad | O(n) | 10 veces |
| primeraVenta | O(1) | Permanece constante |

### Criterio de medición

Se utilizará un objeto contador para registrar las visitas a elementos y las comparaciones explícitas realizadas por cada algoritmo instrumentado.

Para primeraVenta se contabilizará un acceso directo al arreglo.

No se pretende contabilizar todas las instrucciones internas del motor de JavaScript, sino operaciones representativas del crecimiento de cada algoritmo.



### Resultados de la medición

| Tamaño | totalVendido | ventaMayor | totalPorCiudad | primeraVenta |
|---:|---:|---:|---:|---:|
| 100 | 200 | 399 | 200 | 1 |
| 1000 | 2000 | 3999 | 2000 | 1 |
| 10000 | 20000 | 39999 | 20000 | 1 |
| 100000 | 200000 | 399999 | 200000 | 1 |

### Clasificación de los algoritmos

**totalVendido — O(n)**

Recorre todos los registros una sola vez. Por cada elemento contabiliza una visita y una comparación. El número de operaciones crece proporcionalmente al tamaño del arreglo.

**ventaMayor — O(n)**

Recorre todos los registros para identificar la venta de mayor valor. Aunque realiza más comparaciones, no contiene ciclos anidados. Su crecimiento continúa siendo lineal.

**totalPorCiudad — O(n)**

Recorre las ventas una sola vez y acumula los ingresos utilizando un objeto como diccionario. Las operaciones de acceso al diccionario se consideran de costo constante esperado y los nombres de las ciudades tienen longitud acotada.

**primeraVenta — O(1)**

Accede directamente al índice cero del arreglo sin realizar recorridos. Su número de operaciones no depende del tamaño de la entrada.

### Comparación entre predicciones y resultados

Los resultados esperados respaldan las predicciones iniciales. Las funciones lineales aumentan aproximadamente diez veces su número de operaciones cuando el tamaño del arreglo se multiplica por diez. La función constante conserva una operación independientemente del volumen de datos.

Ninguna de las cuatro funciones presenta complejidad cuadrática.

### Decisiones técnicas

- Se conservaron las funciones originales del motor v0.1.
- Se crearon versiones instrumentadas independientes.
- Se utilizaron objetos para almacenar los contadores.
- Cada medición comienza con un contador inicializado en cero.
- Se mantuvo la estructura original de los registros.
- Se conservaron los precios asociados a cada producto.
- Los datos generados tienen cantidades entre 1 y 5.
- El conteo de operaciones es independiente del tiempo de ejecución.

### Comando de ejecución

`node src/medir.js`


## MiniReto 6: Diagnóstico de complejidad cuadrática

### Objetivo

Analizar el rendimiento de la función clientesRecurrentes mediante ciclos anidados, mediciones de tiempo y estimaciones de escalabilidad.

### Predicción

Se espera que al duplicar el tamaño de la entrada, las comparaciones entre clientes y el tiempo de ejecución aumenten aproximadamente cuatro veces para los datos generados.

### Verificación funcional

Con los doce registros originales, la función debe retornar los clientes C01, C02 y C03.

### Traza manual

Arreglo de cinco ventas con los clientes C01, C02, C03, C01 y C04.

| Índice i | Índices j comparados | Comparaciones | Coincidencias |
|---:|---|---:|---|
| 0 | 1, 2, 3, 4 | 4 | C01 |
| 1 | 2, 3, 4 | 3 | Ninguna |
| 2 | 3, 4 | 2 | Ninguna |
| 3 | 4 | 1 | Ninguna |
| 4 | Ninguno | 0 | Ninguna |
| Total | | 10 | C01 |

La cantidad de comparaciones entre clientes se obtiene mediante:

C(n) = n(n - 1) / 2

El término dominante es n², por lo que los ciclos anidados tienen complejidad cuadrática.

### Mediciones de referencia

Las siguientes mediciones corresponden a una ejecución de referencia en Node.js v22.16.0. Se realizaron tres pruebas por tamaño y se seleccionó la mediana.

| Registros | Comparaciones | Tiempo (ms) | Factor |
|---:|---:|---:|---:|
| 1000 | 499500 | 3.565 | — |
| 2000 | 1999000 | 14.430 | 4.05 |
| 4000 | 7998000 | 58.779 | 4.07 |
| 8000 | 31996000 | 223.751 | 3.81 |
| 16000 | 127992000 | 1000.766 | 4.47 |

Los resultados muestran que el tiempo aumenta aproximadamente cuatro veces cuando se duplica el tamaño de la entrada.

### Estimaciones de rendimiento

Se utiliza la fórmula:

T(n) = T₀ × (n / n₀)²

Tomando como referencia 16000 registros y 1000.766 milisegundos:

| Registros | Comparaciones | Tiempo estimado |
|---:|---:|---:|
| 100000 | 4999950000 | 39.09 segundos |
| 1000000 | 499999500000 | 65.15 minutos |

Estas estimaciones suponen que se mantiene el comportamiento cuadrático observado. No constituyen mediciones reales de estos tamaños.

### Costo oculto de includes()

El método includes realiza una búsqueda secuencial dentro del arreglo de clientes recurrentes.

Aunque los ciclos anidados realizan O(n²) comparaciones entre clientes, includes puede necesitar O(n) operaciones adicionales en cada llamada.

En determinadas distribuciones de clientes, el peor caso del algoritmo completo puede alcanzar O(n³).

La complejidad espacial auxiliar es O(n), porque el arreglo de clientes recurrentes puede crecer proporcionalmente al número de registros.

### Conclusión para la gerente

El reporte actual funciona correctamente con pocos registros, pero pierde eficiencia cuando aumenta el historial de ventas.

Esto ocurre porque el sistema compara repetidamente las compras entre sí para identificar clientes recurrentes. Cuando se duplica la cantidad de información, el trabajo puede multiplicarse aproximadamente por cuatro o incluso más.

Con el crecimiento comercial previsto, este procedimiento podría generar tiempos de espera inaceptables. Se recomienda optimizar el algoritmo antes de utilizarlo con grandes volúmenes de información.

### Decisiones técnicas

- Se conservó el algoritmo original para diagnosticar su comportamiento.
- Se utilizó el generador del MiniReto 5.
- Se excluyó la generación de datos del tiempo medido.
- Se utilizaron console.time, console.timeEnd y performance.now.
- Se seleccionó la mediana de tres mediciones.
- La prueba de 100000 registros está condicionada a una estimación inferior a dos minutos.

### Comando de ejecución

`node src/medirRecurrentes.js`

Prueba adicional:

`node src/medirRecurrentes.js --100k`




## MiniReto 7: Complejidad espacial y recorrido único

### Objetivo

Comparar el consumo de memoria y el número de recorridos de una cadena de métodos frente a un algoritmo de una sola pasada.

### Predicción

Ambas funciones tendrán complejidad temporal O(n). Sin embargo, la versión encadenada necesitará memoria adicional proporcional a la entrada, mientras que la versión con un ciclo utilizará memoria constante.

### Comparación de algoritmos

| Característica | Cadena | Una pasada |
|---|---|---|
| Etapas de recorrido | 4 | 1 |
| Arreglos nuevos | 3 | 0 |
| Complejidad temporal | O(n) | O(n) |
| Complejidad espacial | O(n) | O(1) |
| Modifica los datos originales | No | No |

### Análisis temporal

La versión encadenada realiza cuatro etapas:

1. map: normalización de las ciudades.
2. filter: selección de las ventas válidas de la ciudad.
3. map: transformación de las ventas en valores monetarios.
4. reduce: acumulación de los ingresos.

Los dos primeros métodos recorren n elementos. Los dos siguientes recorren m elementos, donde m representa las ventas que cumplen la condición.

El número de visitas es:

T(n, m) = 2n + 2m

En el peor caso, cuando todas las ventas coinciden:

T(n) = 4n

Al eliminar las constantes, obtenemos O(n).

La versión de una pasada realiza n visitas, por lo que también pertenece a O(n).

### Análisis espacial

La versión encadenada crea tres arreglos adicionales y nuevos objetos durante la normalización. Su consumo de memoria crece proporcionalmente al tamaño de los datos.

La versión de una pasada utiliza un acumulador y variables temporales, sin crear colecciones intermedias. Su complejidad espacial es O(1), considerando nombres de ciudades de longitud acotada.

### Clasificación espacial del motor

| Función | Complejidad espacial |
|---|---|
| valorVenta | O(1) |
| totalVendido | O(1) |
| unidadesVendidas | O(1) |
| ventaMayor | O(1) |
| ticketPromedio | O(1) |
| ventasPorCiudad | O(1) |
| totalVendidoM | O(n) |
| unidadesVendidasM | O(n) |
| ventasPorCiudadM | O(n) |
| totalPorCiudad | O(n) |
| unidadesPorProducto | O(n) |
| topProductosPorValor | O(n) |
| ventasDelDia | O(n) |
| totalVendidoI | O(1) |
| ventaMayorI | O(1) |
| totalPorCiudadI | O(c) |
| primeraVenta | O(1) |
| clientesRecurrentes | O(n) |
| totalCiudadCadena | O(n) |
| totalCiudadUnaPasada | O(1) |

Los diccionarios de agrupación dependen de la cantidad de claves distintas. Para ciudades se utiliza O(c) y para productos O(p). No obstante, los arreglos intermedios creados por filter y otros métodos hacen que varias funciones tengan una complejidad espacial de O(n).

### Resultados de referencia

Se realizó una prueba independiente con 10000 registros generados.

| Indicador | Cadena | Una pasada |
|---|---:|---:|
| Ingresos | 485997000 | 485997000 |
| Visitas | 24990 | 10000 |
| Arreglos nuevos | 3 | 0 |
| Resultado con arreglo vacío | 0 | 0 |

La versión de una pasada redujo aproximadamente un 59.98 % las visitas a elementos en esta prueba.

Los resultados de la ejecución local deben registrarse después de ejecutar medirMemoria.js.

### Decisión técnica

Se selecciona totalCiudadUnaPasada como implementación preferida para el motor de producción.

Aunque los métodos encadenados ofrecen una representación declarativa y legible, la versión de una pasada obtiene el mismo resultado utilizando menos memoria auxiliar y realizando menos recorridos.

Esta decisión responde a las restricciones de memoria del servidor donde se ejecutará el motor.

Se conservará totalCiudadCadena como referencia para futuras comparaciones de rendimiento.

### Conclusión

Dos algoritmos pueden pertenecer a la misma categoría de complejidad temporal y presentar diferencias importantes en su cantidad real de operaciones y consumo de memoria.

### Comando de ejecución

`node src/medirMemoria.js`