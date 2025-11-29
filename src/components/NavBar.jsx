import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useSearch } from "../context/SearchContext";
import { CarritoContext } from "../context/CarritoContext";

function NavBar() {
    const { cart } = useContext(CarritoContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navigate = useNavigate();
    const location = useLocation(); 
    const { user, logout } = useContext(AuthContext);
    const { busqueda, setBusqueda } = useSearch();

    const cerrarSesion = () => {
        logout();
        toast.success("Sesión cerrada con éxito.", { position: "top-center", autoClose: 2000, hideProgressBar: true });
        navigate('/');
    };

    // Rutas donde queremos mostrar el buscador
    const rutasConBuscador = ["/", "/joyeria", "/hombres", "/mujeres", "/electronica"];
    const mostrarBuscador = rutasConBuscador.includes(location.pathname);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Mi Tienda Online</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/hombres">Hombres</Nav.Link>
                        <Nav.Link as={Link} to="/mujeres">Mujeres</Nav.Link>
                        <Nav.Link as={Link} to="/joyeria">Joyería</Nav.Link>
                        <Nav.Link as={Link} to="/electronica">Electrónica</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto d-flex align-items-center gap-3 text-white">
                        {/* Buscador solo en rutas de productos */}
                        {mostrarBuscador && (
                            <Form className="d-flex align-items-center" style={{ maxWidth: "200px" }}>
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar productos..."
                                    className="me-2"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </Form>
                        )}

                        {user ? (
                            <>
                                <span className="navbar-text text-white me-2">{user.username}</span>

                                {/* Carrito */}
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-carrito">Carrito</Tooltip>}>
                                    <Nav.Link as={Link} to="/carrito" className="position-relative text-white">
                                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                                    </Nav.Link>
                                </OverlayTrigger>

                                {/* Pedidos */}
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-pedidos">Pedidos</Tooltip>}>
                                    <Nav.Link as={Link} to="/pedidos" className="text-white">
                                        <FontAwesomeIcon icon={faClipboardList} size="lg" />
                                    </Nav.Link>
                                </OverlayTrigger>

                                {/* Admin */}
                                {user.type === "admin" && (
                                    <Nav.Link as={Link} to="/admin" className="text-white border border-white rounded px-2 py-1">
                                        Administración
                                    </Nav.Link>
                                )}

                                {/* Logout */}
                                <Button variant="info" size="sm" className="text-white" onClick={cerrarSesion}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Button as={Link} to="/login" variant="info" size="sm" className="text-white">
                                Iniciar Sesión
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
