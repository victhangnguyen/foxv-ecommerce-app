import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
//! imp Comps
import { Row, Col, Button, Form } from 'react-bootstrap';
import LoaderCommponent from '../../../components/LoaderCommponent';
import MessageCommponent from '../../../components/MessageCommponent';

//! imp Actions
import { updateUserProfile } from '../userSlice';

const ProfileScreen = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, userToken, error, success } = useSelector(
    (state) => state.user
  );

  // automatically authenticate user if token is found
  React.useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      id: userInfo._id,
      name: name,
      email: email,
      password: password,
    };
    console.log(
      `%c__Debugger__ProfileScreen__submitHandler`,
      'color: red; font-weight: bold'
    );

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      setMessage(null);
      dispatch(updateUserProfile(userData));
    }
  };

  return (
    <Row>
      <Col md={'3'}>
        <h2>User Profile</h2>
        {message && (
          <MessageCommponent variant={'danger'}>{message}</MessageCommponent>
        )}
        {success && (
          <MessageCommponent variant={'success'}>
            {'Profile Updated'}
          </MessageCommponent>
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
            Thay đổi
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
