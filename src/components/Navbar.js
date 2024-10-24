import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navBar.css'; // Import the CSS file for additional styling

const Navbar = () => {
    return (
        <BootstrapNavbar className='custom-navbar mb-4'>
            <BootstrapNavbar.Brand as={Link} to='/'>Home</BootstrapNavbar.Brand>
        </BootstrapNavbar>
    );
};

export default Navbar;
