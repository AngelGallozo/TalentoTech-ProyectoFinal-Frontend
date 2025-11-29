import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Helmet} from "react-helmet-async";

function Contact() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
    event.stopPropagation();
    } else {
    toast.success("Formulario enviado con éxito!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    }

    setValidated(true);
};

    return (
    <>
    
        <Helmet>
            <title>Contacto | Mi Tienda Online</title>
            <meta name="description" content="Comunícate con nosotros."/>
        </Helmet>
        <Container className="mt-4">
            <h1 className="mb-3">Contáctanos</h1>
            <hr style={{ borderTop: "1px solid #ccc", opacity: 0.5 }} />
            <Row>
            <Col md={6}>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-4">
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required type="text" placeholder="Tu nombre" />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu nombre.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control required type="email" placeholder="nombre@ejemplo.com" />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingresa un correo válido.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" placeholder="Asunto del mensaje" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                    required
                    as="textarea"
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    />
                    <Form.Control.Feedback type="invalid">
                    Por favor ingresa un mensaje.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="d-block mx-auto"
                    style={{ width: "50%" }}
                    aria-label="Enviar email"
                >
                    Enviar
                </Button>

                </Form>
                <ToastContainer />
            </Col>

            <Col
                md={6}>
                <img
                src="https://mjpcontentlabs.com/wp-content/uploads/2021/01/newsletter-blog.jpg'"
                alt="Equipo trabajando y sonriente en reunión"
                style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}></img>
            </Col>
            </Row>
        </Container>
    </>
    );
}

export default Contact;
