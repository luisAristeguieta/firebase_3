import { useEffect, useState } from "react";
import { obtenerProductos, type Producto } from "../services/productoService";

export function ProductoLista() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setCargando(true);
                const lista = await obtenerProductos();
                setProductos(lista);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();
    }, []);

    if (cargando) {
        return <p>Cargando productos...</p>;
    }

    return (
        <div>
            <h2>Lista de Productos</h2>
            {productos.length === 0 ? (
                <p>No hay productos registrados.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}