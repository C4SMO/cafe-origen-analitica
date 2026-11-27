function valorVenta(venta) {
    if (!venta) {
        return 0;
    }

    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

function unidadesVendidas(ventas) {
    let unidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            unidades += venta.cantidad;
        }
    }

    return unidades;
}

function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            if (mayor === null ||
                valorVenta(venta) > valorVenta(mayor)) {

                mayor = venta;
            }
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
    let contador = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            contador++;
        }
    }

    if (contador === 0) {
        return 0;
    }

    return totalVendido(ventas) / contador;
}

function ventasPorCiudad(ventas, ciudad) {
    let total = 0;

    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada && venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

// Total vendido mediante métodos de arreglo
function totalVendidoM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}


// Unidades vendidas mediante métodos de arreglo
function unidadesVendidasM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => venta.cantidad)
        .reduce((total, cantidad) => total + cantidad, 0);
}


// Ventas por ciudad mediante métodos de arreglo
function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta =>
            venta.ciudad.trim().toLowerCase() === ciudadBuscada &&
            venta.cantidad > 0
        )
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}


// Agrupación de ingresos por ciudad
function totalPorCiudad(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .reduce((grupos, venta) => {
            const nombre = venta.ciudad.trim().toLowerCase();

            const ciudad = nombre.charAt(0).toUpperCase()
                + nombre.slice(1);

            grupos[ciudad] =
                (grupos[ciudad] || 0) + valorVenta(venta);

            return grupos;
        }, {});
}


// Agrupación de unidades por producto
function unidadesPorProducto(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .reduce((grupos, venta) => {
            const producto = venta.producto;

            grupos[producto] =
                (grupos[producto] || 0) + venta.cantidad;

            return grupos;
        }, {});
}


// Ranking de productos por ingresos
function topProductosPorValor(ventas, k) {
    const agrupados = ventas
        .filter(venta => venta.cantidad > 0)
        .reduce((grupos, venta) => {
            const producto = venta.producto;

            grupos[producto] =
                (grupos[producto] || 0) + valorVenta(venta);

            return grupos;
        }, {});

    const productos = Object.entries(agrupados)
        .map(([producto, total]) => ({
            producto,
            total
        }));

    return [...productos]
        .sort((a, b) => b.total - a.total)
        .slice(0, k);
}

// Filtrar las ventas de una fecha específica
function ventasDelDia(ventas, fecha) {
    return ventas.filter(venta => venta.fecha === fecha);
}

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
};