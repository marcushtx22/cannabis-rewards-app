import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete customer');
        }
        setCustomers(customers.filter(customer => customer._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="table-container">
      <h2>Customers</h2>
      <Link to="/customers/new" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
        Add New Customer
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Membership Tier</th>
            <th>Rewards Points</th>
            <th>Total Spent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{`${customer.firstName} ${customer.lastName}`}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.membershipTier}</td>
              <td>{customer.rewardsPoints}</td>
              <td>${customer.totalSpent.toFixed(2)}</td>
              <td>
                <Link to={`/customers/${customer._id}`} className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList; 