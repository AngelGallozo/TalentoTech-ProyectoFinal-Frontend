import React, { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_BACKEND_URL; 

    // === Cargar productos desde Spring Boot ===
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch(`${API_URL}/productos`);
                if (!res.ok) throw new Error("Error al cargar productos del backend");

                const data = await res.json();
                setProductos(data);

            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, [API_URL]);

    // === Agregar producto (POST) ===
    const agregarProducto = async (nuevoProducto) => {
        try {
            const res = await fetch(`${API_URL}/productos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });

            if (!res.ok) throw new Error("Error al crear producto");

            const productoCreado = await res.json();
            setProductos(prev => [...prev, productoCreado]);

        } catch (err) {
            console.error(err);
        }
    };

    // === Editar producto (PUT) ===
    const editarProducto = async (productoActualizado) => {
        try {
            const res = await fetch(`${API_URL}/productos/${productoActualizado.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoActualizado),
            });

            if (!res.ok) throw new Error("Error al editar producto");

            const actualizado = await res.json();

            setProductos(prev =>
                prev.map((p) => (p.id === actualizado.id ? actualizado : p))
            );

        } catch (err) {
            console.error(err);
        }
    };

    // === Eliminar producto (DELETE) ===
    const eliminarProducto = async (id) => {
        try {
            const res = await fetch(`${API_URL}/productos/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Error al eliminar producto");

            setProductos(prev => prev.filter((p) => p.id !== id));

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ProductsContext.Provider
            value={{
                productos,
                cargando,
                error,
                agregarProducto,
                editarProducto,
                eliminarProducto
            }}>
            {children}
        </ProductsContext.Provider>
    );
};
