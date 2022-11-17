import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Breadcrumb,
  FormSelect,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { fetchProductById } from '../productSlice.jsx';

//! imp components
import RatingComponent from '../../../components/RatingComponent';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';

const ProductScreen = () => {
  const [qty, setQty] = React.useState(0);

  const { productId } = useParams();
  const navigate = useNavigate();
  

  // console.log('__Debugger__screens__productScreen__product: ', productId);

  const dispatch = useDispatch();

  // const product = entities[0];

  React.useEffect(() => {
    dispatch(fetchProductById(productId));
    // console.log('__Debugger__screens__productScreen__product: ', entities);
  }, [dispatch, productId]);

  const product = useSelector((state) => state.product);
  const { loading, entities, error } = product;

  const addToCartHandler = () => {
    //! history.push()
    navigate(`/cart/${productId}?qty=${qty ? qty : 1}`);
  };

  return (
    <>
      {loading === 'pending' ? (
        <LoaderCommponent />
      ) : error ? (
        <MessageCommponent variant="danger">{error}</MessageCommponent>
      ) : (
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
            <Breadcrumb.Item active>{entities[0]?.name}</Breadcrumb.Item>
          </Breadcrumb>
          {
            //! Product Information
          }
          <Row>
            {
              //! Product Information: Image
            }
            <Col md={6}>
              <Image
                src={entities[0]?.image}
                alt={entities[0]?.name}
                fluid
              ></Image>
            </Col>
            {
              //! Product Information: Details
            }
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{entities[0]?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <RatingComponent
                    value={entities[0]?.rating || 0}
                    text={`${entities[0]?.numReviews} reviews `}
                  />{' '}
                </ListGroup.Item>
                <ListGroup.Item>Price: ${entities[0]?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {entities[0]?.description}
                </ListGroup.Item>
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
                        <strong>{entities[0]?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {entities[0]?.countInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {entities[0]?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormSelect
                            size="sm"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(entities[0].countInStock).keys()].map(
                              (key) => (
                                <option key={key} value={key + 1}>
                                  {key + 1}
                                </option>
                              )
                            )}
                          </FormSelect>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Button
                        className="btn btn-block"
                        type="button"
                        disabled={entities[0]?.countInStock === 0}
                        onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default ProductScreen;
