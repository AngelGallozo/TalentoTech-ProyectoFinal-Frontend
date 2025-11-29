import React from "react";
import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ producto, addToCart }) => {

    const sinStock = producto.stock === 0;

    return (
        <Card
            className="h-100 d-flex flex-column product-card"
            style={{
                filter: sinStock ? "grayscale(100%)" : "none",
                opacity: sinStock ? 0.6 : 1,
                position: "relative",
                transition: "0.2s"
            }}
        >
            {sinStock && (
                <span
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: "red",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        fontSize: "0.8rem"
                    }}
                >
                    SIN STOCK
                </span>
            )}

            <Link
                to={`/productos/${producto.id}`}
                style={{ pointerEvents: sinStock ? "none" : "auto" }}
            >
                <Card.Img
                    variant="top"
                    src={producto.image}
                    alt={producto.title}
                    className="card-img-top img-fluid"
                    style={{ height: '200px', objectFit: 'contain' }}
                />
            </Link>

            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title style={{
                        height: '48px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {producto.title}
                    </Card.Title>

                    <Card.Text className="product-description">
                        {producto.description}
                    </Card.Text>

                    <Card.Text>
                        <strong>${producto.price}</strong>
                    </Card.Text>

                    <Card.Text className="text-muted small">
                        Stock disponible: {producto.stock}
                    </Card.Text>
                </div>

                <Button
                    variant={sinStock ? "secondary" : "primary"}
                    onClick={() => !sinStock && addToCart(producto)}
                    className="mt-2"
                    aria-label="Agregar al carrito"
                    disabled={sinStock}
                >
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" /> {sinStock ? "Sin stock" : "Agregar al carrito"}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
