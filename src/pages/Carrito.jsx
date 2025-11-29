import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap"; // Agregué InputGroup
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Carrito() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRealizarPedido = async () => {
        if (!user) {
            toast.error("Debes iniciar sesión para realizar un pedido");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            toast.warn("El carrito está vacío");
            return;
        }

        const pedido = {
            user: user.id,   
            productos: cart.map(p => ({
                id: p.id,
                cantidad: p.quantity
            }))
        };

        try {
            console.log("URL:"+API_URL);
            const response = await fetch(`${API_URL}/pedidos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedido)
            });

            if (response.status === 400) {
                const data = await response.json();
                toast.error(`No se pudo realizar el pedido: ${data.error}`);
                return;
            }

            if (!response.ok) {
                toast.error("Error al realizar el pedido");
                return;
            }

            toast.success("Pedido realizado con éxito");
            cleanCart();

            // ✅ REDIRECCIONA A LOS PEDIDOS DEL USUARIO LOGUEADO
            navigate(`/pedidos`);

        } catch (error) {
            toast.error("Error de conexión con el servidor");
            console.error(error);
        }
    };


    const { cart, cleanCart, removeFromCart, updateQuantity } = useContext(CarritoContext);

    const total = cart.reduce(
        (acc, producto) => acc + producto.price * producto.quantity,
        0
    );

    const handleQuantityChange = (id, newQuantity) => {
        const qty = Math.max(1, parseInt(newQuantity) || 1);
        updateQuantity(id, qty);
    };

    // Nuevas funciones para + y -
    const incrementQuantity = (id, currentQty) => {
        updateQuantity(id, currentQty + 1);
    };

    const decrementQuantity = (id, currentQty) => {
        if (currentQty > 1) {
            updateQuantity(id, currentQty - 1);
        }
    };

    return (
        <>
            <Helmet>
                <title>Carrito | Mi Tienda Online</title>
                <meta name="description" content="Comunícate con nosotros." />
            </Helmet>

            <Container className="mt-4">
                <h1 className="mb-4 text-center">Carrito de Compras</h1>
                <hr />

                {cart.length === 0 ? (
                    <p className="text-center">El carrito está vacío.</p>
                ) : (
                    <>
                        <Row className="fw-bold border-bottom pb-2 mb-2 d-none d-sm-flex">
                            <Col sm={4}>Producto</Col>
                            <Col sm={2}>Cantidad</Col>
                            <Col sm={2}>Precio Unitario</Col>
                            <Col sm={2}>Subtotal</Col>
                            <Col sm={2}>Acciones</Col>
                        </Row>

                        {cart.map((producto) => (
                            <Row key={producto.id} className="align-items-center mb-4 pb-3 border-bottom border-3 border-dark-subtle">
                                {/* Vista para pantallas pequeñas */}
                                <Col xs={12} className="d-block d-sm-none">
                                    <p><strong>Producto:</strong> {producto.title}</p>
                                    <p><strong>Cantidad:</strong></p>
                                    <InputGroup>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => decrementQuantity(producto.id, producto.quantity)}
                                            aria-label="Disminuir cantidad"
                                        >
                                            -
                                        </Button>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={producto.quantity}
                                            onChange={(e) => handleQuantityChange(producto.id, e.target.value)}
                                            size="sm"
                                            style={{
                                                width: "3.5rem",
                                                textAlign: "center",
                                            }}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => incrementQuantity(producto.id, producto.quantity)}
                                            aria-label="Aumentar cantidad"
                                        >
                                            +
                                        </Button>
                                    </InputGroup>
                                    <p className="mt-2"><strong>Precio Unitario:</strong> ${producto.price.toFixed(2)}</p>
                                    <p><strong>Subtotal:</strong> ${(producto.price * producto.quantity).toFixed(2)}</p>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(producto.id)}
                                        aria-label="Eliminar producto del carrito"
                                    >
                                        Eliminar
                                    </Button>
                                </Col>

                                {/* Vista para pantallas medianas y grandes */}
                                <Col sm={4} className="d-none d-sm-block">{producto.title}</Col>
                                <Col sm={2} className="d-none d-sm-block">
                                    <InputGroup>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => decrementQuantity(producto.id, producto.quantity)}
                                            aria-label="Disminuir cantidad"
                                        >
                                            -
                                        </Button>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={producto.quantity}
                                            onChange={(e) => handleQuantityChange(producto.id, e.target.value)}
                                            size="sm"
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => incrementQuantity(producto.id, producto.quantity)}
                                            aria-label="Aumentar cantidad"
                                        >
                                            +
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col sm={2} className="d-none d-sm-block">${producto.price.toFixed(2)}</Col>
                                <Col sm={2} className="d-none d-sm-block">
                                    ${(producto.price * producto.quantity).toFixed(2)}
                                </Col>
                                <Col sm={2} className="d-none d-sm-block">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(producto.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Col>
                            </Row>
                        ))}

                        <Row className="border-top pt-3 mt-4 fw-bold">
                            <Col xs={6} sm={{ span: 2, offset: 8 }}>Total:</Col>
                            <Col xs={6} sm={2}>${total.toFixed(2)}</Col>
                        </Row>

                        <Row className="mt-4">
                            <Col
                                xs={12}
                                sm={6}
                                className="mb-2 mb-sm-0 d-flex justify-content-sm-start justify-content-center"
                            >
                                <Button
                                variant="warning"
                                onClick={cleanCart}
                                className="btn-responsive w-md-auto px-4 py-2"
                                aria-label="Limpiar el carrito"
                                >
                                Limpiar carrito
                                </Button>
                            </Col>
                            <Col
                                xs={12}
                                sm={6}
                                className="d-flex justify-content-sm-end justify-content-center"
                            >
                                <Button
                                    variant="success"
                                    className="btn-responsive w-md-auto px-4 py-2"
                                    aria-label="realizar pedido"
                                    onClick={handleRealizarPedido}
                                >
                                    Realizar Pedido
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
}

export default Carrito;
