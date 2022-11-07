import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//! imp css
import '../bootstrap.min.css';
import '../main.css';

//! imp screens
import HomeScreen from '../features/Home/screens/HomeScreen';
import ProductScreen from '../features/Product/screens/ProductScreen';
import ErrorScreen from '../features/Error/screens/ErrorScreen';

import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

//! imp components
import Footer from '../components/Footer';
import Header from '../components/Header';

//! imp Redux
import { Provider } from 'react-redux';
import store from './store';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    errorElement: <ErrorScreen />,
    children: [
      { path: '/', element: <HomeScreen /> },
      { path: '/home', element: <HomeScreen /> },
      { path: '/product/:productId', element: <ProductScreen /> },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
