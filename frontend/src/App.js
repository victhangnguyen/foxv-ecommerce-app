import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//! imp css
import './App.css';
import './bootstrap.min.css';
import './main.css';

//! imp components
import RootComponent from './components/RootComponent';

//! imp screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ErrorScreen from './screens/ErrorScreen';

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
  return <RouterProvider router={router} />;
};

export default App;
