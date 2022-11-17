import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
//! imp Actions
import { userLogout, getUserDetails } from '../features/User/userSlice';

//! imp icons
import CartIcon from './icons/CartIcon';
import UserIcon from './icons/UserIcon';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, userToken, error } = useSelector(
    (state) => state.user
  );

  // automatically authenticate user if token is found
  React.useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  const logoutHandler = () => {
    dispatch(userLogout());
    navigate('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to={'/'}>Foxv Shop</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="nav-link" to="/cart">
                <div className="d-flex align-items-center">
                  <CartIcon size={'1rem'} color={'#fff'} />
                  <span>Cart</span>
                </div>
              </NavLink>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={'div'}>
                    <Link to="/user-profile">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink className="nav-link" to="login">
                  <div className="d-flex align-items-center">
                    <UserIcon size={'1rem'} color={'#fff'} />
                    <span>Sign In</span>
                  </div>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderComponent;
