// components/OrderListPage.jsx
import React, { useState, useEffect } from 'react';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load static data when the component mounts
    setOrders([
      {
        _id: '1',
        customerName: 'John Doe',
        total: 100,
        orderDate: new Date(),
      },
      {
        _id: '2',
        customerName: 'Jane Smith',
        total: 150,
        orderDate: new Date(),
      },
      // Add more static data as needed
    ]);
  }, []); // Empty dependency array to load data only once

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log('Deleting order:', id);
  };

  return (
    <div>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.customerName}</td>
              <td>{order.total}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => console.log('Edit', order._id)}>Edit</button>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListPage;
