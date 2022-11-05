import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

//! imp icons
import CartIcon from '../components/icons/CartIcon';
import UserIcon from '../components/icons/UserIcon';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand><Link to={'/'}>Foxv Shop</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className='nav-link' to="/cart">
                <div className="d-flex align-items-center">
                  <CartIcon size={'1rem'} color={'#fff'} />
                  <span>Cart</span>
                </div>
              </NavLink>
              <NavLink className='nav-link' to="login">
                <div className="d-flex align-items-center">
                  <UserIcon size={'1rem'} color={'#fff'} />
                  <span>Sign In</span>
                </div>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
