import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className='bg-dark text-white mt-5 py-4'>
            <Container className='text-center'>
                <div className='mb-2'>
                    <FontAwesomeIcon icon={faPhone} className='me-2' />
                    <span>+54 9 11 1234-5678 | +54 9 11 8765-4321</span>
                </div>

                <div className='mb-3'>
                    <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="https://instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                    <a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                </div>

                <p className='mb-0'>&copy; {year} Mi Sitio Online. Todos los derechos reservados.</p>
            </Container>
        </footer>
    );
}
