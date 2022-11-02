import React from 'react';
import { Container } from 'react-bootstrap';

//! imp css
import './App.css';
import './bootstrap.min.css';
import './style.css';

//! imp comps
import Footer from './components/Footer';
import Header from './components/Header';

//! imp screens
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Hello world</h1>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
