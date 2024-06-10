import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function UpdateCart() {
  const { id } = useParams();
  const [cart, setCart] = useState({
    productId: '',
    productName: '',
    customerId: '',
    customerName: '',
    price: '',
    quantity: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart  data and update state
    axios.get(`http://localhost:5000/cart/${id}`)
      .then(result => {
        console.log(result);
        setCart(result.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const updateCart = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/cart/${id}`, cart)
      .then(result => {
        console.log(result);
        navigate('/cart');
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCart({ ...cart, [name]: value });
  };

  return (
    <Box
      height={80}
      width={1000}
      my={4}
      display="flex"
      marginLeft="220px"
      aligns="center"
      gap={2}
      p={2}
      sx={{ bgcolor: '#E7F1F7'}}
    >
      <input
        type="text"
        name="productId"
        value={cart.productId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="productName"
        value={cart.productName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="customerId"
        value={cart.customerId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="customerName"
        value={cart.customerName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        value={cart.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="quantity"
        value={cart.quantity}
        onChange={handleInputChange}
      />
      <IconButton onClick={() => navigate('/cart')} color="inherit">
        <CloseIcon />
      </IconButton>
      <Button
        type="submit"
        variant="contained"
        color="success"
        style={{ marginTop: '10px' }}
        onClick={updateCart}
      >
        Update Cart
      </Button>
    </Box>
  );
}

export default UpdateCart;
