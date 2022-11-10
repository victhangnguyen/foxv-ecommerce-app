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
} from 'react-bootstrap';

//! imp Comps
import MessageCommponent from '../../../components/MessageCommponent.js';

const CartScreen = () => {
  const productId = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = [];

  for (let entry of searchParams.entries()) {
    params.push(entry);
  }
  
  console.log(`%c __Debugger__params: ${params}`, 'color: red; font-weight: bold');

  return <div>CartScreen</div>;
};

export default CartScreen;
