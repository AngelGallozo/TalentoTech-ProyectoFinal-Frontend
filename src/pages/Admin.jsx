import React, { useContext, useState } from 'react';
import { Container, Table, Button, Modal, Image, Spinner, Alert } from 'react-bootstrap';
import { ProductsContext } from '../context/ProductsContext';
import FormularioProducto from '../components/FormularioProducto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPen,faTrash } from '@fortawesome/free-solid-svg-icons';
import {Helmet} from "react-helmet-async";


function Admin() {
    const { productos, eliminarProducto, editarProducto, agregarProducto, cargando, error } = useContext(ProductsContext);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);


    const handleAgregar = () => {
        setProductoSeleccionado(null);
        setModoEdicion(false);
        setMostrarModal(true);
    };

    const handleEditar = (producto) => {
        setProductoSeleccionado(producto);
        setModoEdicion(true);
        setMostrarModal(true);
    };

    const handleEliminar = (id) => {
        setProductoAEliminar(id);
        setShowConfirm(true);
    };

    const confirmarEliminar = () => {
        eliminarProducto(productoAEliminar);
        setShowConfirm(false);
        setProductoAEliminar(null);
    
    };

    const cancelarEliminar = () => {
        setShowConfirm(false);
        setProductoAEliminar(null);
    };



    const handleCerrarModal = () => {
        setMostrarModal(false);
        setProductoSeleccionado(null);
        setModoEdicion(false);
    };

    const handleGuardarProducto = (producto) => {
        if (modoEdicion) {
            editarProducto(producto);
        } else {
            agregarProducto(producto);
        }
    };

    return (
        <>
            <Helmet>
                <title>Administración | Mi Tienda Online</title>
                <meta name="description" content="Administra los productos."/>
            </Helmet>
            <Container className="mt-4">
                <h2>Gestión de Productos</h2>

                {cargando ? (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "150px" }}>
                        <Spinner animation="border" role="status" variant="primary" style={{ width: "4rem", height: "4rem" }} />
                        <span className="mt-2">Cargando productos...</span>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <>
                        <Button variant="primary" className="my-3" onClick={handleAgregar} aria-label="Agregar producto">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Agregar producto
                        </Button>


                        <Table striped bordered hover responsive>
                            <thead>
                                <tr className="text-center">
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>
                                            <Image src={producto.image} alt={producto.title} thumbnail style={{ width: '60px' }} />
                                        </td>
                                        <td>{producto.title}</td>
                                        <td>
                                            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="mb-2 w-100"
                                                    onClick={() => handleEditar(producto)}
                                                    aria-label="Editar producto"
                                                >
                                                    <FontAwesomeIcon icon={faPen} className="me-2" />
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="w-100"
                                                    onClick={() => handleEliminar(producto.id)}
                                                    aria-label="Eliminar producto"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}

                <Modal show={mostrarModal} onHide={handleCerrarModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modoEdicion ? 'Editar producto' : 'Agregar producto'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormularioProducto
                            productoInicial={productoSeleccionado}
                            modo={modoEdicion ? 'editar' : 'agregar'}
                            onGuardar={handleGuardarProducto}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={showConfirm} onHide={cancelarEliminar} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Estás seguro de que deseas eliminar este producto?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelarEliminar} aria-label="Cancelar eliminacion">
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={confirmarEliminar} aria-label="Confirmar eliminacion">
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
}

export default Admin;
