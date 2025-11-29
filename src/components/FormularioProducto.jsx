import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import validarFormulario from './ValidarFormulario';
import { ProductsContext } from '../context/ProductsContext';

function FormularioProducto({ productoInicial = null, modo = 'agregar' }) {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        id: productoInicial?.id || '',
        title: productoInicial?.title || '',
        price: productoInicial?.price || '',
        description: productoInicial?.description || '',
        category: productoInicial?.category || '',
        image: productoInicial?.image || '',
        stock: productoInicial?.stock || '',
        rating: {
            rate: productoInicial?.rating?.rate || '',
            count: productoInicial?.rating?.count || '',
        }
    });

    const [categories, setCategories] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errores, setErrores] = useState({});

    // Obtener productos y funciones del contexto
    const { productos, agregarProducto, editarProducto } = useContext(ProductsContext);

    // === CARGAR CATEGORÍAS DESDE TU BACKEND ===
    useEffect(() => {
        // categorías derivadas de productos
        const categoriasUnicas = [...new Set(productos.map(p => p.category))];
        setCategories(categoriasUnicas);
    }, [productos]);

    // === FORM ===
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rate' || name === 'count') {
            setFormData({
                ...formData,
                rating: {
                    ...formData.rating,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // === SUBMIT ===
    const handleSubmit = (e) => {
        e.preventDefault();

        const erroresValidacion = validarFormulario(formData);
        setErrores(erroresValidacion);
        if (Object.keys(erroresValidacion).length > 0) return;

        const producto = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            rating: {
                rate: parseFloat(formData.rating.rate),
                count: parseInt(formData.rating.count)
            }
        };

        if (modo === 'agregar') {

            fetch(`${API_URL}/productos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(producto)
            })
                .then(res => res.json())
                .then(data => {
                    agregarProducto(data);
                    setShowSuccess(true);
                })
                .catch(err =>
                    console.error("Error al agregar producto:", err)
                );

        } else {
            fetch(`${API_URL}/productos/${producto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(producto)
            })
                .then(res => res.json())
                .then(data => {
                    editarProducto(data);
                    setShowSuccess(true);
                })
                .catch(err =>
                    console.error("Error al editar producto:", err)
                );
        }

        setErrores({});
    };

    return (
        <>
            {showSuccess && <Alert variant="success">
                {modo === 'agregar'
                    ? 'Producto agregado'
                    : 'Producto actualizado'} exitosamente.
            </Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                isInvalid={!!errores.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Precio ($USD)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                isInvalid={!!errores.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={!!errores.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.description}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                isInvalid={!!errores.category}
                            >
                                <option value="">Selecciona una categoría</option>

                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errores.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                isInvalid={!!errores.image}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.image}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                isInvalid={!!errores.stock}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.stock}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Rating - Rate</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                name="rate"
                                value={formData.rating.rate}
                                onChange={handleChange}
                                isInvalid={!!errores.rate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.rate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Rating - Count</Form.Label>
                            <Form.Control
                                type="number"
                                name="count"
                                value={formData.rating.count}
                                onChange={handleChange}
                                isInvalid={!!errores.count}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.count}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                >
                    {modo === 'agregar'
                        ? 'Agregar producto'
                        : 'Actualizar producto'}
                </Button>
            </Form>
        </>
    );
}

export default FormularioProducto;
