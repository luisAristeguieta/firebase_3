import { useState, type SyntheticEvent } from "react";
import { crearProducto } from "../services/productoService";

export function ProductoForm() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [guardando, setGuardando] = useState(false);

    const guardarProducto = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!nombre.trim() || !precio || !stock) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            setGuardando(true);
            const nombreLimpio = nombre.trim();

            const productoId = await crearProducto(
                nombreLimpio,
                Number(precio),
                Number(stock)
            );

            console.log("Producto creado: ", productoId);
            alert(`Producto "${nombreLimpio}" guardado correctamente.`);

            setNombre("");
            setPrecio("");
            setStock("");
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Ocurrió un error al guardar el producto en Firestore.");
        } finally {
            setGuardando(false);
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
                <button type="submit" disabled={guardando}>
                    {guardando ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </div>
    );
}