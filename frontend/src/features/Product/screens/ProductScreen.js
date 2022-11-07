import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Breadcrumb,
} from 'react-bootstrap';
import axios from 'axios';

//! imp components
import RatingComponent from '../../../components/RatingComponent';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = React.useState({});

  const { productId } = useParams();

  React.useEffect(() => {
    //! fetching by asynchronous catch Promise
    axios
      .get('/api/products/' + productId)
      .then((result) => {
        console.log('__Debugger__screens__ProductScreen__result: ', result);
        setProduct(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  console.log('__Debugger__screens__productScreen__product: ', product);

  return (
    <React.Fragment>
      {
        //! Breadcrumb
      }
      <Breadcrumb>
        <Breadcrumb.Item linkAs={'span'}>
          <Link to={'/'}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={'span'}>
          <Link to={'/'}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      {
        //! Product Information
      }
      <Row>
        {
          //! Product Information: Image
        }
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        {
          //! Product Information: Details
        }
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingComponent
                value={product.rating || 0}
                text={`${product.numReviews} reviews `}
              />{' '}
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        {
          //! Product Information: Card Add to Cart
        }
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    className="btn btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductScreen;
