import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  FormSelect,
} from 'react-bootstrap';
//! imp Actions
import { addToCart } from '../cartSlice';

//! imp Comps
import MessageCommponent from '../../../components/MessageCommponent.js';
import TrashIcon from '../../../components/icons/TrashIcon.js';

const CartScreen = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  // console.log(
  //   `%c __Debugger__CartScreen: ${productId}`,
  //   'color: green; font-weight: bold'
  // );

  const [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get('qty');
  // console.log(
  //   `%c __Debugger__CartScreen: ${qty}`,
  //   'color: green; font-weight: bold'
  // );

  const { cartItems, loading, error } = useSelector((state) => state.cart); //! by BT after qty, above Effect

  // console.log(
  //   '__Debugger__CartScreen__cartItems: ',
  //   cartItems,
  //   ' - loading: ',
  //   loading,
  //   ' - error: ',
  //   error
  // );

  React.useEffect(() => {
    if (productId) {
      dispatch(addToCart({ productId, qty }));
    }
  }, [dispatch, productId, qty]); //! by BT

  const onChangeHandler = (productId, qty) => {
    // console.log(
    //   `%c __Debugger__CartScreen__onChangeHandler__productId: ${productId} - qty: ${qty}`,
    //   'color: brown; font-weight: bold'
    // );
    dispatch(addToCart({ productId, qty }));
  };

  const removeFromCartHandler = () => {
    console.log(
      `%c __Debugger__CartScreen__removeFromCartHandler`,
      'color: red; font-weight: bold'
    );
  };

  const checkoutHandler = () => {
    console.log(
      `%c __Debugger__CartScreen__checkoutHandler`,
      'color: red; font-weight: bold'
    );
  };

  return (
    <Row>
      <Col md="8">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageCommponent>
            Your cart is empty! <Link to={'/'}>Go Back</Link>
          </MessageCommponent>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md="2">
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md="3">
                      <Link to={`/product/${productId}`}>{item.name}</Link>
                    </Col>
                    <Col md="2">{item.price}</Col>
                    <Col md="3">
                      <FormSelect
                        size="md"
                        value={item.qty}
                        onChange={(e) =>
                          onChangeHandler(item.product, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((key) => (
                          <option key={key} value={key + 1}>
                            {key + 1}
                          </option>
                        ))}
                      </FormSelect>
                    </Col>
                    <Col md="2">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <TrashIcon size={'1.5rem'} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={'4'}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>
                Tổng cộng: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                ) sản phẩm
              </h5>
              <h4>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Tiến hành Thanh toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
