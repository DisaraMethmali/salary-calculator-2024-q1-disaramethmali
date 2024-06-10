import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartcarts, setCartcarts] = useState([]);

  useEffect(() => {
    fetchCartcarts();
  }, []);

  const fetchCartcarts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCart'); // Adjust URL as needed
      setCartcarts(response.data);
    } catch (error) {
      console.error('Error fetching cart carts:', error);
    }
  };

  const handleDeleteCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteCart/${id}`); // Adjust URL as needed
      fetchCartcarts(); // Refresh cart carts after deletion
    } catch (error) {
      console.error('Error deleting cart cart:', error);
    }
  };

  const handleEditCart =  (id) => {
    navigate(`/pages/updatecart/${id}`);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartcarts.map((cart) => (
            <tr key={cart._id}>
              <td>{cart.productId}</td>
              <td>{cart.productName}</td>
              <td>{cart.customerId}</td>
              <td>{cart.customerName}</td>
              <td>{cart.price}</td>
              <td>{cart.quantity}</td>
              <td>
                <button onClick={() => handleEditCart(cart._id)}>Edit</button>
                <button onClick={() => handleDeleteCart(cart._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
