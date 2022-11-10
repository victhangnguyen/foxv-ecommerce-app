import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { fetchProducts } from '../../Product/productsSlice.js';

import { Col, Row } from 'react-bootstrap';

//! imp comps
import ProductComponent from '../../Product/components/ProductComponent';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';

const HomeScreen = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.product);
  // console.log(
  //   '__Debugger__features__Home__screens__HomScreen__product: ',
  //   product
  // );
  const { entities, loading, error } = products;

  return (
    <>
      <h1>Latest Products</h1>
      {loading === 'idle' || loading === 'pending' ? (
        <LoaderCommponent />
      ) : error ? (
        <MessageCommponent variant="danger">{error}</MessageCommponent>
      ) : (
        <Row>
          {
            //! Container that in main (App.js)
          }
          {entities.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductComponent product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
