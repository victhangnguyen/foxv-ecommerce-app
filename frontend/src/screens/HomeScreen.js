import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

//! imp comps
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      console.log('__Debugger__screens__HomeScreen__data: ', data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {
        //! Container that in main (App.js)
      }
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
