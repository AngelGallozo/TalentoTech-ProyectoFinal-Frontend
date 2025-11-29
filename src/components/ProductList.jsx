import React, { useContext, useState, useEffect  } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import {Helmet} from "react-helmet-async";
import { useSearch } from "../context/SearchContext";

function ProductList({ title, category = null }) {
    const productosPorPagina = 4;
    const [paginaActual, setPaginaActual] = useState(1);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const { busqueda } = useSearch();
    const { addToCart } = useContext(CarritoContext);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    // Obtener productos desde backend cada vez que cambie búsqueda o categoría
    useEffect(() => {
        setCargando(true);
        setError(null);

        let url = `${API_URL}/productos`;
        if (busqueda.trim() !== "") {
            url += `?nombre=${encodeURIComponent(busqueda)}`;
        }

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener productos");
                return res.json();
            })
            .then(data => {
                // Si hay categoría, filtrar localmente
                const filtrados = category ? data.filter(p => p.category === category) : data;
                setProductos(filtrados);
                setPaginaActual(1); // Reiniciar a la primera página
            })
            .catch(err => setError(err.message))
            .finally(() => setCargando(false));
    }, [busqueda, category]);

    // Calcular productos para la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    const irAPagina = (numero) => setPaginaActual(numero);

    useEffect(() => {
        if (paginaActual > totalPaginas) setPaginaActual(totalPaginas || 1);
    }, [totalPaginas, paginaActual]);

    return (
        <>
            <Helmet>
                <title>Productos | Mi Tienda Online</title>
                <meta name="description" content="Explora nuestra variedad de productos."/>
            </Helmet>
            <Container className="mt-4">
                <h1 className="mb-3">{title}</h1>
                <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />

                {cargando && (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "150px" }}>
                        <Spinner animation="border" role="status" variant="primary" style={{ width: "4rem", height: "4rem" }} />
                        <span className="mt-2">Cargando productos...</span>
                    </div>
                )}

                {error && <p className="text-danger">{error}</p>}

                {!cargando && !error && (
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {productosActuales.map((producto) => (
                            <Col key={`${producto.id}-${producto.title}`}>
                                <ProductCard producto={producto} addToCart={addToCart} />
                            </Col>
                        ))}
                    </Row>
                )}

                {!cargando && !error && totalPaginas > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                                    <li
                                        key={numero}
                                        className={`page-item ${numero === paginaActual ? "active" : ""}`}
                                        onClick={() => irAPagina(numero)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span className="page-link">{numero}</span>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </Container>
        </>
    );
}

export default ProductList;
