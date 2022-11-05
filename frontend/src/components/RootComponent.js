import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

//! imp components
import Footer from '../components/Footer';
import Header from '../components/Header';

const RootComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default RootComponent;
