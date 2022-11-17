import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

//! imp css
import '../bootstrap.min.css';
import '../main.css';

//! imp screens
import HomeScreen from '../features/Home/screens/HomeScreen';
import ProductScreen from '../features/Product/screens/ProductScreen';
import CartScreen from '../features/Cart/screens/CartScreen';
import ErrorScreen from '../features/Error/screens/ErrorScreen';

import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

//! imp Comps
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import LoginScreen from '../features/User/screens/LoginScreen';
import RegisterScreen from '../features/User/screens/RegisterScreen';
import ProfileScreen from '../features/User/screens/ProfileScreen';

//! imp Redux
import { Provider } from 'react-redux';
import store from './store';

const RootComponent = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <FooterComponent />
    </React.Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    errorElement: <ErrorScreen />,
    children: [
      // { path: '/', element: <HomeScreen /> },
      { index: true, element: <HomeScreen /> },
      { path: '/home', element: <HomeScreen /> },
      { path: '/login', element: <LoginScreen /> },
      { path: '/register', element: <RegisterScreen /> },
      { path: '/product/:productId', element: <ProductScreen /> },
      {
        path: '/cart',
        children: [
          { index: true, element: <CartScreen /> },
          { path: '/cart/:productId', element: <CartScreen /> },
        ],
      },

      { path: '/user-profile', element: <ProfileScreen /> },
    ],
  },
]);

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};

export default App;
