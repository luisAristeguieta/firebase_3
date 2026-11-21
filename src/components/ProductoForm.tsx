import { useState, type SyntheticEvent } from "react";
import { crearProducto } from "../services/productoService";

export function ProductoForm() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        try {
            const productoId = await crearProducto(
                nombre,
                Number(precio),
                Number(stock)
            );

            console.log("Producto creado: ", productoId);

            setNombre("");
            setPrecio("");
            setStock("");
        } catch (error) {
            console.log("error :" + error);
        }
    };

    return (
        <div>
            <form onSubmit={guardarProducto}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}