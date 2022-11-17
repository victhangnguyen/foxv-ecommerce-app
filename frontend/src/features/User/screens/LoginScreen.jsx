import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

//! imp comps
import FormContainer from '../../../components/FormContainer';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';
//! imp Actions
import { userLogin } from '../userSlice';

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //! build Controller-Form
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (userInfo) {
      navigate('/');
      // navigate('/user-profile');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    //! DISPATCH LOGIN
    dispatch(userLogin({ email, password }));
  };
  // console.log(
  //   `%c __Debugger__[Selector]__LoginScreen: \nloading: ${loading}\nuserInfo: ${userInfo}\nerror: ${error}\nsuccess: ${success}`,
  //   'color: red; font-weight: bold'
  // );
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && (
        <MessageCommponent variant={'danger'}>{error}</MessageCommponent>
      )}
      {loading === 'pending' && <LoaderCommponent />}
      {
        //! email
      }
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Form.Group>
        {
          //! password
        }
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>
        {
          //! submit btn
        }
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
