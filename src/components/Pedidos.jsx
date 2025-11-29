import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Container, Card, ListGroup, Row, Col, Button, Modal } from "react-bootstrap";
import {Helmet} from "react-helmet-async";

function Pedidos() {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const { user } = useContext(AuthContext);
    const [pedidos, setPedidos] = useState([]);

    // Para modal de confirmación
    const [showConfirm, setShowConfirm] = useState(false);
    const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

    useEffect(() => {
        if (!user) return;

        fetch(`${API_URL}/pedidos/user/${user.id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error obteniendo pedidos");
                return res.json();
            })
            .then((data) => setPedidos(data))
            .catch(() => toast.error("No se pudieron cargar los pedidos"));
    }, [user]);

    // === ELIMINAR PEDIDO ===
    const handleEliminar = (pedidoId) => {
        setPedidoAEliminar(pedidoId);
        setShowConfirm(true);
    };

    const confirmarEliminar = async () => {
        try {
            const res = await fetch(`${API_URL}/pedidos/${pedidoAEliminar}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("No se pudo eliminar el pedido");

            setPedidos(pedidos.filter(p => p.id !== pedidoAEliminar));
            toast.success("Pedido eliminado correctamente");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setShowConfirm(false);
            setPedidoAEliminar(null);
        }
    };

    const cancelarEliminar = () => {
        setShowConfirm(false);
        setPedidoAEliminar(null);
    };

    return (
        <>
        <Helmet>
            <title>Mis Pedidos | Mi Tienda Online</title>
            <meta name="description" content="Estos somos nosotros."/>
        </Helmet>

        <Container className="mt-4">
            <h1 className="mb-3">Mis Pedidos</h1>
            <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />

            {pedidos.length === 0 && <p className="text-center">No tenés pedidos todavía.</p>}

            {pedidos.map((p) => (
                <Card className="mb-4 shadow-sm" key={p.id}>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <strong>Pedido #{p.id}</strong>
                        <span className="text-muted">{p.fecha}</span>
                    </Card.Header>

                    <Card.Body>
                        <ListGroup variant="flush">
                            {p.items.map((item, idx) => (
                                <ListGroup.Item key={idx}>
                                    <Row className="align-items-center">
                                        <Col xs={6} sm={8}>{item.nombreProducto}</Col>
                                        <Col xs={3} sm={2}>x{item.cantidad}</Col>
                                        <Col xs={3} sm={2} className="text-end">${item.subtotal.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-between align-items-center">
                        {/* Botón eliminar a la izquierda */}
                        <Button variant="danger" size="sm" onClick={() => handleEliminar(p.id)}>
                            Eliminar
                        </Button>

                        {/* Total a la derecha */}
                        <span className="fw-bold">Total: ${p.total.toFixed(2)}</span>
                    </Card.Footer>

                </Card>
            ))}

            {/* Modal de confirmación */}
            <Modal show={showConfirm} onHide={cancelarEliminar} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar este pedido?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelarEliminar}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarEliminar}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
        </>
    );
}

export default Pedidos;
