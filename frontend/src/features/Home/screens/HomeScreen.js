import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

//! imp comps
import ProductComponent from '../../Product/components/ProductComponent';

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
      {console.log(products)}
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductComponent product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
