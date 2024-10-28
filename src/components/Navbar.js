import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <BootstrapNavbar className='custom-navbar mb-2' expand="lg">
            <Container fluid>
                <BootstrapNavbar.Brand as={Link} to='/'>Home</BootstrapNavbar.Brand>
                <BootstrapNavbar.Brand as={Link} to='/countries' className="ms-auto">Countries List</BootstrapNavbar.Brand>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
