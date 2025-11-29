import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Helmet} from "react-helmet-async";

function About() {
    return (
        <>
            <Helmet>
                <title>Sobre Nosotros | Mi Tienda Online</title>
                <meta name="description" content="Estos somos nosotros."/>
            </Helmet>
            <Container className="mt-4">
                <h1 className="mb-3">Sobre Nosotros</h1>
                <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />

                <Row className="align-items-center">
                <Col md={6}>
                    <p>
                    <strong>Somos una tienda online comprometida con ofrecerte la mejor experiencia de compra</strong>, 
                    desde la comodidad de tu hogar. Nuestra plataforma fue pensada para que encuentres productos de 
                    calidad, a buen precio, y con envíos seguros y rápidos a todo el país.
                    </p>

                    <p>
                    <strong>Nuestra historia comenzó en el año 2020</strong>, cuando un pequeño equipo apasionado por la 
                    tecnología y el comercio decidió crear una tienda diferente: cercana, accesible y confiable. 
                    Empezamos con un catálogo reducido, pero con una gran misión: 
                    <strong> facilitar el acceso a productos esenciales y novedosos sin complicaciones</strong>.
                    </p>

                    <p>
                    Desde entonces, <strong>crecimos gracias a la confianza de nuestros clientes</strong>, 
                    ampliamos nuestras categorías y optimizamos nuestros procesos para que comprar en línea sea una 
                    experiencia simple, rápida y segura.
                    </p>

                    <p>
                    <strong>
                        Nuestro objetivo sigue siendo el mismo: que cada persona pueda encontrar lo que necesita en un solo 
                        lugar, con atención personalizada y un servicio que marque la diferencia.
                    </strong>
                    </p>
                </Col>

                <Col md={6}>
                    <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                    alt="Equipo trabajando y sonriente en reunión"
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
                    />
                </Col>
                </Row>
            </Container>
        </>
    );
}

export default About;
