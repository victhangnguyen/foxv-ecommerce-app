import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

//! imp comps
import FormContainer from '../../../components/FormContainer';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';
//! imp Actions
import { userRegister } from '../userSlice';

const RegisterScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //! build Controller-Form
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    //! redirect user to login page if registration was successful
    if (success) {
      navigate('/login');
    }

    //! redirect authenticated user to profile screen
    if (userInfo) {
      navigate('/user-profile');
    }
  }, [navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    //! DISPATCH LOGIN
    const userData = { name, email, password, confirmPassword };

    console.log(
      `%c__Debugger__RegisterScreen__userDate: ${JSON.stringify(userData)}`,
      'color: blue; font-weight: bold'
    );

    dispatch(userRegister(userData));
  };
  console.log(
    `%c __Debugger__[Selector]__RegisterScreen: \nloading: ${loading}\nuserInfo: ${userInfo}\nerror: ${error}\nsuccess: ${success}`,
    'color: red; font-weight: bold'
  );
  return (
    <FormContainer>
      <h2>Sign In</h2>

      {message && (
        <MessageCommponent variant={'danger'}>{message}</MessageCommponent>
      )}
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
          //! name
        }
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // autoComplete="name"
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
          //! confirmPassword
        }
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Enter Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>
        {
          //! submit btn
        }
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to={`login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
